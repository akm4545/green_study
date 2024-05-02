@Data
@AllArgsConstructor
public class PrincipalDetails implements OAuth2User {

    private User user;

    private Map<String, Object> attributes;

    private Boolean registerSw;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return user.getEmail();
    }
}
