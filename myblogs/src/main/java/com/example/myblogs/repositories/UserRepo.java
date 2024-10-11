package com.example.myblogs.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myblogs.models.User;

public interface UserRepo extends JpaRepository<User, Long> {
	User findByUsername(String username);

}
