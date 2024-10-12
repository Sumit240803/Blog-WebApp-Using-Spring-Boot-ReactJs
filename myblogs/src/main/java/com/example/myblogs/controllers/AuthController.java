package com.example.myblogs.controllers;


import com.example.myblogs.dto.AuthResponse;
import com.example.myblogs.dto.LoginDto;
import com.example.myblogs.dto.SignUpDto;
import com.example.myblogs.models.User;
import com.example.myblogs.service.UserService;
import com.example.myblogs.utility.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){
        userService.saveNewUser(
                signUpDto.getName(),
                signUpDto.getUsername(),
                signUpDto.getEmail(),
                signUpDto.getPassword()
        );
        return  ResponseEntity.ok("User Registered :)");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword())
            );
            String token = jwtUtils.generateToken(loginDto.getUsername());
            return ResponseEntity.ok(new AuthResponse("Login Success",token));
        }catch (BadCredentialsException e){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password");
    }
    }
    @PostMapping("/adminRegister")
    public ResponseEntity<?> adminRegister(@RequestBody SignUpDto signUpDto){
        userService.saveNewAdmin(
                signUpDto.getUsername(),
                signUpDto.getEmail(),
                signUpDto.getPassword()
        );
        return  ResponseEntity.ok("You are now an admin :)");
    }
}