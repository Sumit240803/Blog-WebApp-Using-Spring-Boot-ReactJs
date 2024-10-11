package com.example.myblogs.service;

import com.example.myblogs.models.User;
import com.example.myblogs.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Arrays;


@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveNewUser(String name, String username,String email , String password ){
     User user = userRepo.findByUsername(username);
       if(user!=null) {
           throw new RuntimeException("Username Already Present");
       }
        User newUser = new User();
        newUser.setName(name);
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRoles("USER");
        return userRepo.save(newUser);
    }

}
