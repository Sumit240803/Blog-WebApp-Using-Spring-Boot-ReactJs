package com.example.myblogs.controllers;

import com.example.myblogs.models.Blogs;
import com.example.myblogs.repositories.BlogRepo;
import com.example.myblogs.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/public")
public class PublicController {
    @Autowired
    private BlogRepo blogRepo;
    @Autowired
    private BlogService blogService;
    @GetMapping("/showAllBlogs")
    public ResponseEntity<List<Blogs>> allBlogs(){

        return ResponseEntity.ok(blogRepo.findAll());
    }

    @GetMapping("/getBlogById/{id}")
    public ResponseEntity<Optional<Blogs>> blogById(@PathVariable Long id){
        return ResponseEntity.ok().body(blogRepo.findById(id));
    }

    @GetMapping("/getAllBlogs")
    public ResponseEntity<List<Blogs>> getAllBlogs(@RequestParam(defaultValue = "5") int page , @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok().body(blogService.getAllBlogs(page , size));
    }

}
