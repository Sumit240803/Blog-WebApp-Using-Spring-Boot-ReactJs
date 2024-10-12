package com.example.myblogs.controllers;

import com.example.myblogs.dto.BlogDto;
import com.example.myblogs.dto.UserDto;
import com.example.myblogs.models.Blogs;
import com.example.myblogs.models.User;
import com.example.myblogs.repositories.UserRepo;
import com.example.myblogs.service.BlogService;
import com.example.myblogs.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private BlogService blogService;
    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRoles());
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/addBlog")
    public ResponseEntity<String> addBlog(@RequestBody BlogDto blogDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        blogService.createBlog(
                blogDto.getContent(),
                blogDto.getTitle(),
                user
        );
        return ResponseEntity.ok("Blog added");
    }
    @GetMapping("/myBlogs")
    public ResponseEntity<List<Blogs>> myBlogs(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        return ResponseEntity.ok(blogService.getBlogs(user.getId()));
    }





}
