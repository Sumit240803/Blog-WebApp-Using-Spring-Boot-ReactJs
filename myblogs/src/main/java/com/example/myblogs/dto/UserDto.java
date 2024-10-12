package com.example.myblogs.dto;

import com.example.myblogs.models.Blogs;
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
}
