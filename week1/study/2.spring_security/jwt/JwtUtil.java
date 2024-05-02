@RequiredArgsConstructor
@Component
public class JwtUtil{

    /**
     * 토큰 생성
     *
     * @param claimMap
     * @param tokenType
     * @return
     */
    public String createToken(Map<String, Object> claimMap, TokenType tokenType) {
        long now = System.currentTimeMillis();
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());
        long expireDate = now + tokenType.getValue();

        claimMap.put("iss", ISS); // 발급주최
        claimMap.put("iat", now / 1000); // 발행시간
        claimMap.put("type", tokenType.getKey()); // 토큰타입 (ACCESS,REFRESH)
        return Jwts.builder()
                .setClaims(claimMap)
                .signWith(signingKey, signatureAlgorithm)
                .setExpiration(new Date(expireDate))
                .compact();
    }

    /**
     * 토큰 파싱
     *
     * @param token
     * @return
     */
    public Map<String, Object> parseTokenToMap(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
//            throw EXPIRED_JWT_EXCEPTION;
            e.printStackTrace();
            throw new RuntimeException();
        } catch (Exception e) {
//            throw INVALID_JWT_EXCEPTION;
            e.printStackTrace();
            throw new RuntimeException();
        }

    }

    /**
     * 토큰 유효확인
     *
     * @param token
     * @returnq
     */
    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return !claims.getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * 토큰 유효시간 확인
     *
     * @param token
     * @return
     */
    public long expireDateBetweenNow(String token) {
        Map<String, Object> refreshMap = parseTokenToMap(token);
        long now = System.currentTimeMillis();
        Integer expireDate = (Integer) refreshMap.get("exp");
        return Math.abs((expireDate - (now / 1000)) / 60 / 60 / 24);
    }

    public enum TokenType {
        ACCESS_TOKEN(1000L * 60 * 60), REFRESH_TOKEN(1000L * 60 * 60 * 24 * 30), QR_TOKEN(1000L * 60 * 60 * 24 * 30 * 100);

        private final long value;

        TokenType(long value) {
            this.value = value;
        }

        public String getKey() {
            return name();
        }

        public long getValue() {
            return value;
        }
    }

    public Authentication authenticate(Map<String, Object> claimMap) throws AuthenticationException {
        Integer userSeq = (Integer)claimMap.get("userSeq");
        String email = (String)claimMap.get("email");
        String authorityType = (String)claimMap.get("authorityType");

        List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
        authList.add(new SimpleGrantedAuthority(authorityType));

        return new UsernamePasswordAuthenticationToken(
                userSeq,
                email,
                authList);
    }
}
