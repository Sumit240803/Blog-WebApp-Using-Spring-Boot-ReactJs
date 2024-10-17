package com.example.myblogs.dto;

import com.example.myblogs.models.Blogs;
import com.example.myblogs.models.Comments;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserDto
{
    private long id;
    private String name;
    private String username;
    private String email;
    private String role;
    private String avatar;
    private List<Blogs> blogs;
}
