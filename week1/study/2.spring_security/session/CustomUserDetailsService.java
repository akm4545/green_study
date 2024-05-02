@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	AdminMapper adminDAO;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		SecurityUser user = adminDAO.getUserById(username);
		
		if(user == null) {
			throw new UsernameNotFoundException(username);
		}

		return user;
	}

}