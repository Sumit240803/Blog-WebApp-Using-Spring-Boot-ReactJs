package com.example.myblogs.service;

import com.example.myblogs.models.Blogs;
import com.example.myblogs.models.Comments;
import com.example.myblogs.models.User;
import com.example.myblogs.repositories.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    public void postComment(String comment, User user, Blogs blog){
        Comments comments = new Comments();
        comments.setComment(comment);
        comments.setUser(user);
        comments.setBlog(blog);
        commentRepo.save(comments);
    }

    public List<Comments> getComments(User user){
       return commentRepo.findByUser_Id(user.getId()) ;
    }

    public void deleteComment(Long id){
        commentRepo.deleteById(id);
    }
}
