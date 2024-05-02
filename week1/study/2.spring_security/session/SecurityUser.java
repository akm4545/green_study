public class SecurityUser implements UserDetails{
	
	private String id;
	private String password;
	private String name;
	private String auth;
	private int enabled;
	private ArrayList<GrantedAuthority> authList;
	
	

	public ArrayList<GrantedAuthority> getAuthList() {
		return authList;
	}

	public void setAuthList(ArrayList<GrantedAuthority> authList) {
		this.authList = authList;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		authList = new ArrayList<GrantedAuthority>();
		if(id.equals("test")) {
			authList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			authList.add(new SimpleGrantedAuthority("ROLE_USER"));
		}else{
			authList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			authList.add(new SimpleGrantedAuthority("ROLE_USER"));
		}
		return authList;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return id;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public String getAdminId() {
		return id;
	}
	
	public void setAdminId(String adminId) {
		this.id = adminId;
	}
	
	public String getAdminPassword() {
		return password;
	}
	
	public void setAdminPassword(String adminPassword) {
		this.password = adminPassword;
	}

	public int getEnabled() {
		return 1;
	}
}