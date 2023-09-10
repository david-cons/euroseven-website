package com.titi.euro7.security;

import org.springframework.core.convert.converter.Converter;
import com.titi.euro7.entities.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;


import java.util.logging.Logger;

@Component
public class JwtToUserConverter implements Converter<Jwt, UsernamePasswordAuthenticationToken> {


    Logger log = Logger.getLogger(JwtToUserConverter.class.getName());

    @Override
    public UsernamePasswordAuthenticationToken convert(Jwt jwt) {
        User user = new User();
        user.setId(Long.parseLong(jwt.getSubject()));
       // List<String> roles = jwt.getClaimAsStringList("roles");

     //   Collection<GrantedAuthority> authorities = new ArrayList<>();
     //   for (String role: roles) {
     //       authorities.add(new SimpleGrantedAuthority(role));
     //   }

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, jwt, null);

        log.info(token.toString());
        return token;
    }
}