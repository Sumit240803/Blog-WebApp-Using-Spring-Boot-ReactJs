package com.example.myblogs.repositories;

import com.example.myblogs.models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comments,Long> {
    List<Comments> findByUser_Id(Long userId);
}
