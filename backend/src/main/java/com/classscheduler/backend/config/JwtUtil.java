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
public class JwtUtil {

    private String secret="betchdays";
    private String secretForRemarks="GOoDdAyS";



    public String extractUsername(String token){
        return extractClamis(token,Claims::getSubject);
    }
    public Date extractExpiration(String token){
        return extractClamis(token ,Claims::getExpiration);
    }
    public <T> T extractClamis(String token , Function<Claims,T> claimsResolve){
        final Claims claims=extractAllClaims(token);
        return claimsResolve.apply(claims);
    }
    public String genreateToken(String username,String role){
        Map<String ,Object> cliams=new HashMap<>();
        cliams.put("role",role);
        return createToken(cliams,username);
    }

    private String createToken(Map<String ,Object> claims,String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ProjectConst.EXP_TOKEN_DATE))
                .signWith(SignatureAlgorithm.HS256,secret).compact();
    }

    public Claims extractAllClaims(String token) {

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
/**
 * Remark Token
 * */


    public Date extractRemarksExpiration(String token){
        return extractRemarksClamis(token ,Claims::getExpiration);
    }
    public <T> T extractRemarksClamis(String token , Function<Claims,T> claimsResolve){
        final Claims claims=extractAllRemarksClaims(token);
        return claimsResolve.apply(claims);
    }
    private Boolean isRemarksTokenExpired(String token){
        return extractRemarksExpiration(token).before(new Date());

    }
    public Long extractFormationIdFromRemarksToken(String token){
        return Long.parseLong(extractAllRemarksClaims(token).get("formation_id").toString());
    }
    public Long extractTrainerIdFromRemarksToken(String token){
        return Long.parseLong(extractAllRemarksClaims(token).get("trainer_id").toString());
    }

    private Claims extractAllRemarksClaims(String token){
        return Jwts.parser()
                .setSigningKey(secretForRemarks)
                .parseClaimsJws(token)
                .getBody();
    }
    private String createRemarksToken(Map<String ,Object> claims,String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ProjectConst.EXP_REMARKS_TOKEN_DATE))
                .signWith(SignatureAlgorithm.HS256,secretForRemarks).compact();
    }
    public String generateRemarksToken(String subject, Long formationId, Long trainerId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("formation_id", formationId);
        claims.put("trainer_id", trainerId);
        claims.put("type", "remarks");
        // Customize your remarks token as needed
        return createRemarksToken(claims, subject);
    }
    // validate the remarks token and return claims values as map verifing the expiration date
    public Map<String, Object> validateRemarksToken(String token) {
        System.out.println("got here");
        Claims claims = extractAllRemarksClaims(token);
        System.out.println("got here2");
        System.out.println(claims);
        if (claims != null && !claims.isEmpty() && !isRemarksTokenExpired(token)) {
            return claims;
        }
        return null;
    }




}
