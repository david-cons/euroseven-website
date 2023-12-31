package com.titi.euro7.controllers;

import com.titi.euro7.dto.LoginDTO;
import com.titi.euro7.dto.SignupDTO;
import com.titi.euro7.dto.TokenDTO;
import com.titi.euro7.entities.User;
import com.titi.euro7.security.TokenGenerator;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    Logger log = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    UserDetailsManager userDetailsManager;
    @Autowired
    TokenGenerator tokenGenerator;
    @Autowired
    DaoAuthenticationProvider daoAuthenticationProvider;
    @Autowired
    @Qualifier("jwtRefreshTokenAuthProvider")
    JwtAuthenticationProvider refreshTokenAuthProvider;

    @PostMapping("/register")
    public ResponseEntity<TokenDTO> register(@Validated @RequestBody SignupDTO signupDTO) {
        User user = new User(signupDTO.getUsername(), signupDTO.getPassword());
        user.setUsername(signupDTO.getUsername());
        user.setRole(signupDTO.getRole());
        List<GrantedAuthority> authorities = new ArrayList<>();
        switch (user.getRole()) {
            case ("ROLE_ADMIN") -> authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            case ("ROLE_USER") -> authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            case ("ROLE_INCASARI") -> authorities.add(new SimpleGrantedAuthority("ROLE_INCASARI"));
        }

        userDetailsManager.createUser(user);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, signupDTO.getPassword(), authorities);

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@Validated @RequestBody LoginDTO loginDTO) {
        log.info("Received login request for user: {}", loginDTO.getUsername());

        try {
            Authentication authentication = daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginDTO.getUsername(), loginDTO.getPassword()));
            log.info("Successfully authenticated user: {}", loginDTO.getUsername());

            TokenDTO token = tokenGenerator.createToken(authentication);

            token.setRole(tokenGenerator.decodeAccessToken(token.getAccessToken()).getClaim("role"));
            log.info("Successfully generated token for user: {}", loginDTO.getUsername());

            return ResponseEntity.ok(token);

        } catch (AuthenticationException e) {
            log.error("Failed to authenticate user: {}", loginDTO.getUsername(), e);
            throw e;

        } catch (Exception e) {
            log.error("An unexpected error occurred while processing login for user: {}", loginDTO.getUsername(), e);
            throw e;
        }
    }

    @PostMapping("/token")
    public ResponseEntity<TokenDTO> token(@RequestBody TokenDTO tokenDTO) {
        try {

            System.out.println(tokenDTO.getRefreshToken());
            Authentication authentication = refreshTokenAuthProvider.authenticate(new BearerTokenAuthenticationToken(tokenDTO.getRefreshToken()));
        Jwt jwt = (Jwt) authentication.getCredentials();
        System.out.println(jwt);
        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
        }
        catch(Error e) {
            System.out.print(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/role")
    public ResponseEntity<String> getRole(@RequestParam("token") String token) {
        Jwt jwt = tokenGenerator.decodeAccessToken(token);
        String role = jwt.getClaimAsString("roles");
        role = role.substring(1, role.length() - 1);
        return ResponseEntity.ok(role);
    }

    @PostMapping("/decode/refresh")
    public ResponseEntity<Map<String, Object>> decodeRefresh(@RequestBody TokenDTO token) {
        return ResponseEntity.ok(tokenGenerator.decodeRefreshToken(token));
    }
}
