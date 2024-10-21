package com.example.myblogs.controllers;

import com.example.myblogs.models.Blogs;
import com.example.myblogs.models.Comments;
import com.example.myblogs.models.User;
import com.example.myblogs.repositories.BlogRepo;
import com.example.myblogs.repositories.CommentRepo;
import com.example.myblogs.repositories.UserRepo;
import com.example.myblogs.service.BlogService;
import com.example.myblogs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private BlogRepo blogRepo;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private BlogService blogService;
    @Autowired
    private UserService userService;
    //Fetch All Users in Database

    @GetMapping("/allUser")
    public ResponseEntity<List<User>> allUsers(@RequestParam(defaultValue = "5") int page , @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(userService.getUsers(page,size));
    }

    //Getting all blogs

    @GetMapping("/allBlog")
    public ResponseEntity<List<Blogs>> allBlogs(@RequestParam(defaultValue = "5") int page , @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(blogService.getAllBlogs(page,size));
    }

    //Deleting the user
    @DeleteMapping("/removeUser/{userId}")
    public ResponseEntity<String> removeUser(@PathVariable Long userId){
        userRepo.deleteById(userId);
        return ResponseEntity.ok("Deleted the user :)");
    }

    //Deleting the blog
    @DeleteMapping("/deleteBlog/{blogId}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long blogId){
        blogRepo.deleteById(blogId);
        return ResponseEntity.ok("Blog deleted Successfully :)");
    }

    @GetMapping("/allComments")
    public ResponseEntity<List<Comments>> getComments(@RequestParam(defaultValue = "5") int page , @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok().body(userService.getComments(page,size));
    }
    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id){
        commentRepo.deleteById(id);
        return ResponseEntity.ok().body("Comment Deleted");
    }
}
