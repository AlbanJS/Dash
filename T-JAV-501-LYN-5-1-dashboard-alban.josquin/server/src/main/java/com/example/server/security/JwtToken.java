package com.example.server.security;

import com.example.server.models.user.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class JwtToken {
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String createToken(User user) {
        return Jwts.builder().setSubject(user.get_id()).signWith(key).compact();
    }

    public boolean checkToken(String token, User user) throws Exception {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject().equals(user.get_id());
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
