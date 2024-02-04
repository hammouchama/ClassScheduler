package com.classscheduler.backend.config;

import com.classscheduler.backend.constants.ProjectConst;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Service
public class JwtUtil_backup {

    private String secret="betchdays";
    private String secretForRemarks="GOoDdAyS";



    public String extractUsername(String token){
        return extractClamis(token,Claims::getSubject);
    }
    public Date extractExpiration(String token){
        return extractClamis(token ,Claims::getExpiration);
    }
    public <T> T extractClamis(String token , Function<Claims,T> claimsResolve){
        final Claims claims=extractAllClaims(token,secret);
        return claimsResolve.apply(claims);
    }
    public String genreateToken(String username,String role){
        Map<String ,Object> cliams=new HashMap<>();
        cliams.put("role",role);
        return createToken(cliams,username,secret);
    }

    private String createToken(Map<String ,Object> claims,String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ProjectConst.EXP_TOKEN_DATE))
                .signWith(SignatureAlgorithm.HS256,secret).compact();
    }

    public Claims extractAllClaims(String token, String secret) {

        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)  // Use parseClaimsJws instead of parseClaimsJwt
                .getBody();
    }

    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());

    }
    public Boolean validateToken(String token, UserDetails userDetails){
        final String username=extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }



    private String createRemarksToken(Map<String ,Object> claims,String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ProjectConst.EXP_REMARKS_TOKEN_DATE))
                .signWith(SignatureAlgorithm.HS256,secretForRemarks).compact();
    }
    public String generateRemarksToken(String subject, Long individualId, Long trainerId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("individual_id", individualId);
        claims.put("trainer_id", trainerId);
        claims.put("type", "remarks");
        // Customize your remarks token as needed
        return createRemarksToken(claims, subject);
    }


}
