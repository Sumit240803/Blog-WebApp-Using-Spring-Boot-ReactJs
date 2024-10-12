package com.example.myblogs.repositories;

import com.example.myblogs.models.Blogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BlogRepo extends JpaRepository<Blogs , Long> {
    List<Blogs> findByUserId(Long id);
}
