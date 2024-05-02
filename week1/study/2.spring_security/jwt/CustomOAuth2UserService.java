@Service
@AllArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    private final UserUtil userUtil;

    private final EncryptUtil encryptUtil;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    public OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        String providerType = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        User loginUser = OAuth2UserFactory.getOAuth2User(providerType, user);
        User savedUser = userRepository.findByTokenAndEmail(loginUser.getToken(), encryptUtil.encryp(loginUser.getEmail()));
        Boolean registerSw = false;

        if (savedUser == null) {
            userUtil.encryptUserInfo(loginUser);
            loginUser = insertUserEntity(loginUser);
            registerSw = true;

            savedUser = loginUser;
        } else if (savedUser.getPhone() == null) {
            registerSw = true;
        }

        return new PrincipalDetails(savedUser, user.getAttributes(), registerSw);
    }

    @Transactional
    public User insertUserEntity(User user){
        return userRepository.save(user);
    }
}
