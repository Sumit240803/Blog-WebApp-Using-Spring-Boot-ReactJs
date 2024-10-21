package com.example.myblogs.service;

import com.example.myblogs.models.Comments;
import com.example.myblogs.models.User;
import com.example.myblogs.repositories.CommentRepo;
import com.example.myblogs.repositories.UserRepo;
import com.example.myblogs.utility.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Arrays;
import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CommentRepo commentRepo;
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
        newUser.setAvatar("https://ibb.co/0tp4ygk");
        return userRepo.save(newUser);
    }
    public User saveNewAdmin(String username , String email, String password){
        User user = userRepo.findByUsername(username);
        if(user!=null){
            throw new RuntimeException("Username already Present");
        }
        User myuser = new User();
        myuser.setName("admin");
        myuser.setUsername(username);
        myuser.setEmail(email);
        myuser.setPassword(passwordEncoder.encode(password));
        myuser.setRoles("ADMIN");
        myuser.setAvatar("https://ibb.co/0tp4ygk");
        return  userRepo.save(myuser);
    }
    public String updatePassword(String username ,String password){
        User user = userRepo.findByUsername(username);
        user.setPassword(passwordEncoder.encode(password));

        userRepo.save(user);
        return jwtUtils.generateToken(user.getUsername());
    }

    public List<User> getUsers(int page , int size){
        Page<User> users = userRepo.findAll(PageRequest.of(page,size));
        return users.getContent();
    }

    public List<Comments> getComments(int page , int size){
        Page<Comments> comments = commentRepo.findAll(PageRequest.of(page,size));
        return comments.getContent();
    }

}
