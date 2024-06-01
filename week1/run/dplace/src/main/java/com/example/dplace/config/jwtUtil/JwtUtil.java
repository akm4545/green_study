package com.example.dplace.config.jwtUtil;

import com.example.dplace.user.repository.UserMapperDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {
	private final Key key;
	private final long accessTokenExpTime;

	public JwtUtil(
			@Value("${jwt.secret}") String secretKey,
			@Value("${jwt.expriration_time}") long accessTokenExpTime
		){
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
		this.accessTokenExpTime = accessTokenExpTime;
	}

	// Access Token 생성
	public String createAccessToken(UserMapperDto member){
		return createToken(member, accessTokenExpTime);
	}

	// JWT 생성
	private String createToken(UserMapperDto member, long exprireTime){
		Claims claims = Jwts.claims();
		claims.put("userId", member.getUserId());
		claims.put("userPassword", member.getUserPassword());
		claims.put("userAuthType", member.getUserAuthType());

		ZonedDateTime now = ZonedDateTime.now();
		ZonedDateTime tokenValidity = now.plusSeconds(exprireTime);

		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(Date.from(now.toInstant()))
				.setExpiration(Date.from(tokenValidity.toInstant()))
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}

	// JWT 검증
	public boolean validateToken(String token){
		try{
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e){
			log.info("Invalid JWT Token", e);
		} catch (ExpiredJwtException e){
			log.info("Expired JWT Token", e);
		} catch (UnsupportedJwtException e){
			log.info("Unsupported JWT Token", e);
		} catch (IllegalArgumentException e){
			log.info("JWT claims string is empty.", e);
		}
		return false;
	}


	// User ID 추출 .. long -> String 으로 변경
	public String getUserId(String token){
		return parseClaims(token).get("userId", String.class);
	}

	// JWT Claims 추출
	public Claims parseClaims(String accessToken){
		try{
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
		} catch (ExpiredJwtException e){
			return e.getClaims();
		}
	}

}
