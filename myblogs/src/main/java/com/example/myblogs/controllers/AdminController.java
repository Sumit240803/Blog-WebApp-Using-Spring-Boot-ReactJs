package com.example.myblogs.controllers;

import com.example.myblogs.models.Blogs;
import com.example.myblogs.models.User;
import com.example.myblogs.repositories.BlogRepo;
import com.example.myblogs.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private BlogRepo blogRepo;
    @GetMapping("/allUser")
    public ResponseEntity<List<User>> allUsers(){
        return ResponseEntity.ok(userRepo.findAll());
    }
    @GetMapping("/allBlog")
    public ResponseEntity<List<Blogs>> allBlogs(){
        return ResponseEntity.ok(blogRepo.findAll());
    }
}
