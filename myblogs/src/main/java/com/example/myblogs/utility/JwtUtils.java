package com.example.myblogs.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Component
public class JwtUtils {
    private final String secret_key = "RmVZOFZtZUdqV1hVVkJCT3F0SGRJSURvU0cyTndjTWtVb1FobmFGTjlXaz0=";
    private SecretKey getSecret(){
        byte[] keyBytes = Decoders.BASE64.decode(secret_key);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String generateToken(String username){
        Map<String,Object> claims = new HashMap<>();
        return createToken(claims , username);
    }
    private String createToken(Map<String, Object> claim , String userName){
        return Jwts.builder()
                .setClaims(claim)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(getSecret() , SignatureAlgorithm.HS256)
                .compact();
    }
    public Boolean validateToken(String token , String username){
        final String myUsername = getUserName(token);
        return (myUsername.equals(username) && !isTokenExpired(token));
    }
    public String getUserName(String token){
        return extractAllClaims(token).getSubject();
    }
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSecret()).build().parseClaimsJws(token).getBody();
    }
    private Boolean isTokenExpired(String token){
        return extractAllClaims(token).getExpiration().before(new Date());
    }

}
