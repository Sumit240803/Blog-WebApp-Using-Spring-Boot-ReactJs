package com.example.myblogs.service;

import com.example.myblogs.models.Blogs;
import com.example.myblogs.models.User;
import com.example.myblogs.repositories.BlogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {
    @Autowired
    private BlogRepo blogRepo;

    public void createBlog(String content , String title, User user,String image){
        Blogs blog = new Blogs();
        blog.setContent(content);
        blog.setTitle(title);
        blog.setUser(user);
        blog.setImage(image);
        blogRepo.save(blog);
    }

    public List<Blogs> getBlogs(Long userId){
        return blogRepo.findByUserId(userId);
    }
}
