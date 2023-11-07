package com.titi.euro7.security;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class WebSecurity {


    @Autowired
    JwtToUserConverter jwtToUserConverter;

    @Autowired
    KeyUtils keyUtils;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserDetailsManager userDetailsManager;


    @PostConstruct
    public void postConstruct() {
        log.info("JwtToUserConverter: " + jwtToUserConverter);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(
                                antMatcher("/api/auth/register"),
                                antMatcher("/api/auth/login"),
                                antMatcher("/api/auth/token"))
                        .permitAll()
                        .requestMatchers(
                                antMatcher("/api/users"),
                                antMatcher("/api/invoices"),
                                antMatcher("/api/invoices/create"),
                                antMatcher("/api/invoices/delete/**"),
                                antMatcher("/api/invoices/search"),
                                antMatcher("/api/invoices/payments"),
                                antMatcher("/api/invoices/nrFacturi/**"),
                                antMatcher("/api/invoices/payments/search"),
                                antMatcher("/api/invoices/update/**"),
                                antMatcher("/api/invoices/upload"),
                                antMatcher("/api/invoices/export"),
                                antMatcher("/api/invoices/payments/export"),
                                antMatcher("/api/meter-readings"),
                                antMatcher("/api/meter-readings/accept/**"),
                                antMatcher("/api/meter-readings/export"),
                                antMatcher("/api/meter-readings/search"),
                                antMatcher("/api/users/create"),
                                antMatcher("/api/users/delete/**"),
                                antMatcher("/api/users/search"),
                                antMatcher("/api/users/update/**"),
                                antMatcher("/api/users/coduriClienti"),
                                antMatcher("/api/users/uploadExcel"),
                                antMatcher("/api/users/export"))
                        .hasAnyAuthority("ROLE_ADMIN", "ROLE_INCASARI")
                        .requestMatchers(
                                antMatcher("/api/checkout/create-checkout-session/**"))
                        .hasAuthority("ROLE_USER")
                        .anyRequest().authenticated()
                )
                .cors((cors) -> cors.configurationSource(request -> {
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.addAllowedOrigin("http://34.147.113.108:3000");
                    corsConfiguration.addAllowedHeader("*");
                    corsConfiguration.addAllowedMethod("*");
                    corsConfiguration.setAllowCredentials(true);
                    return corsConfiguration;
                }))
                .oauth2ResourceServer((oauth2) ->
                        oauth2.jwt((jwt) -> jwt.jwtAuthenticationConverter(jwtToUserConverter))
                )
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling((exceptions) -> exceptions
                        .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                        .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
                );
        return http.build();
    }

    @Bean
    @Primary
    JwtDecoder jwtAccessTokenDecoder() {
        return NimbusJwtDecoder.withPublicKey(keyUtils.getAccessTokenPublicKey()).build();

    }

    @Bean
    @Primary
    JwtEncoder jwtAccessTokenEncoder() {
        JWK jwk = new RSAKey
                .Builder(keyUtils.getAccessTokenPublicKey())
                .privateKey(keyUtils.getAccessTokenPrivateKey())
                .build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    @Qualifier("jwtRefreshTokenAuthProvider")
    JwtDecoder jwtRefreshTokenDecoder() {
        return NimbusJwtDecoder.withPublicKey(keyUtils.getRefreshTokenPublicKey()).build();
    }

    @Bean
    JwtEncoder jwtRefreshTokenEncoder() {
        JWK jwk = new RSAKey
                .Builder(keyUtils.getRefreshTokenPublicKey())
                .privateKey(keyUtils.getRefreshTokenPrivateKey())
                .build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    JwtAuthenticationProvider jwtRefreshTokenAuthProvider() {
        JwtAuthenticationProvider provider = new JwtAuthenticationProvider(jwtRefreshTokenDecoder());
        provider.setJwtAuthenticationConverter(jwtToUserConverter);
        return provider;
    }

    @Bean
    DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userDetailsManager);
        return provider;
    }
}