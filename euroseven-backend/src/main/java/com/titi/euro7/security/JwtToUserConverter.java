package com.titi.euro7.security;

import org.springframework.core.convert.converter.Converter;
import com.titi.euro7.entities.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.Collection;
import java.util.logging.Logger;

@Component
public class JwtToUserConverter implements Converter<Jwt, UsernamePasswordAuthenticationToken> {


    Logger log = Logger.getLogger(JwtToUserConverter.class.getName());

    @Override
    public UsernamePasswordAuthenticationToken convert(Jwt jwt) {
        log.info("JWT Claims: " + jwt.getClaims());
        User user = new User();
        user.setId(Long.parseLong(jwt.getSubject()));
        String role = jwt.getClaimAsString("role");

        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(role));

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, jwt, authorities);
        log.info("Converted UsernamePasswordAuthenticationToken: " + token);

        log.info(token.toString());
        return token;
    }
}