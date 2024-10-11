package com.example.myblogs.service;


import com.example.myblogs.models.User;
import com.example.myblogs.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		User user =	userRepo.findByUsername(username);
		if(user!=null){
		 return org.springframework.security.core.userdetails.User.builder()
					.username(user.getUsername())
					.password(user.getPassword())
				 	.authorities(AuthorityUtils.createAuthorityList(user.getRoles()))
					.build();

		}
		throw new UsernameNotFoundException("User not found with username" + username);
	}
}