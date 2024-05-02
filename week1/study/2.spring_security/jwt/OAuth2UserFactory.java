public class OAuth2UserFactory {

    public static User getOAuth2User(String providerType, OAuth2User user){
        switch (providerType) {
            case "GOOGLE": return User.builder()
                    .token(user.getAttribute("sub"))
                    .name(user.getAttribute("name"))
                    .email(user.getAttribute("email"))
                    .authorityType("USER")
                    .loginType(providerType)
                    .build();
            case "NAVER":
                Map<String, Object> responseNaverMap = user.getAttribute("response");
                return User.builder()
                    .token((String)responseNaverMap.get("id"))
                    .name((String)responseNaverMap.get("name"))
                    .email((String)responseNaverMap.get("email"))
                    .phone(((String)responseNaverMap.get("mobile")).replaceAll("-", ""))
                    .loginType(providerType)
                    .authorityType("USER")
                    .birth((String)responseNaverMap.get("birthyear") + ((String)responseNaverMap.get("birthday")).replaceAll("-", ""))
                    .build();
            case "KAKAO":
                Map<String, Object> responseKakaoMap = user.getAttributes();
                Map<String, Object> kakakoAccountMap = (Map<String, Object>) responseKakaoMap.get("kakao_account");

                return User.builder()
                    .token(String.valueOf((Long)responseKakaoMap.get("id")))
                    .loginType(providerType)
                    .authorityType("USER")
                    .email((String) kakakoAccountMap.get("email"))
                    .build();
            default: return null;
        }
    }
}