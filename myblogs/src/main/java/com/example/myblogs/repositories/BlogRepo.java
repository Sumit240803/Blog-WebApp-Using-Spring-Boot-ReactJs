package com.example.myblogs.repositories;

import com.example.myblogs.models.Blogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BlogRepo extends JpaRepository<Blogs , Long> {

}
