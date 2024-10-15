package com.example.myblogs.controllers;

import com.example.myblogs.dto.BlogDto;
import com.example.myblogs.dto.CommentDt;
import com.example.myblogs.dto.UserDto;
import com.example.myblogs.exceptionHandlers.ResourceNotFoundException;
import com.example.myblogs.models.Blogs;
import com.example.myblogs.models.User;
import com.example.myblogs.repositories.BlogRepo;
import com.example.myblogs.repositories.UserRepo;
import com.example.myblogs.service.BlogService;
import com.example.myblogs.service.CommentService;
import com.example.myblogs.service.CustomUserDetailsService;
import com.example.myblogs.service.UserService;
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
    @Autowired
    private BlogRepo blogRepo;
    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;
    //Getting the user profile

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
        userDto.setBlogs(user.getBlogs());
        userDto.setComments(user.getComments());
        userDto.setAvatar(user.getAvatar());
        return ResponseEntity.ok(userDto);
    }

    //Adding the blog


    @PostMapping("/addBlog")
    public ResponseEntity<String> addBlog(@RequestBody BlogDto blogDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        blogService.createBlog(
                blogDto.getContent(),
                blogDto.getTitle(),
                user,
                blogDto.getImage()
        );
        return ResponseEntity.ok("Blog added");
    }

    //Getting the blog


    @GetMapping("/myBlogs")
    public ResponseEntity<List<Blogs>> myBlogs(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        return ResponseEntity.ok(blogService.getBlogs(user.getId()));
    }



    //Updating the profile(Avatar)

    @PutMapping("/updateAvatar")
    public ResponseEntity<String> updateAvatar(@RequestBody String avatar){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        user.setAvatar(avatar);
        return ResponseEntity.ok("Profile Updated Successfully");
    }

    //Comments Mapping


    @PostMapping("/addComment/{id}")
    public ResponseEntity<String> addComment(@PathVariable Long id, @RequestBody CommentDt commentDt){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        Blogs blogs = blogRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Blog cannot be found!"));
        commentService.postComment(commentDt.getComment(),user,blogs);
        return ResponseEntity.ok().body("Comment Posted!!");
    }

    @GetMapping("/myComments")
    public ResponseEntity<?> getComments(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userRepo.findByUsername(userName);
        return ResponseEntity.ok().body(commentService.getComments(user)) ;
    }
    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
        return ResponseEntity.ok().body("Comment Deleted");
    }


}
