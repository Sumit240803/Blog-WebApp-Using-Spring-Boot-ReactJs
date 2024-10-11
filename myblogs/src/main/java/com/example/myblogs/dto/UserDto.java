package com.example.myblogs.dto;

import lombok.Getter;
import lombok.Setter;

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
