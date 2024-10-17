package com.example.myblogs.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@Entity
@Table(name = "blogs")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Blogs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" , nullable = false)
    @JsonIgnoreProperties({"blogs", "password"})
    private User user;

    @OneToMany(mappedBy = "blog",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnoreProperties("blog")
    private List<Comments> comments;

    private String image;
}
