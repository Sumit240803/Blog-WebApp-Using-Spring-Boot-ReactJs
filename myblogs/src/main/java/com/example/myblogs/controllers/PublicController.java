package com.example.myblogs.controllers;

import com.example.myblogs.models.Blogs;
import com.example.myblogs.repositories.BlogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicController {
    @Autowired
    private BlogRepo blogRepo;

    @GetMapping("/showAllBlogs")
    public ResponseEntity<List<Blogs>> allBlogs(){
        return ResponseEntity.ok(blogRepo.findAll());
    }
}
