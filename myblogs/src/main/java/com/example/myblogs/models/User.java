package com.example.myblogs.models;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@Entity
@Table(name="users", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"username"}),
		@UniqueConstraint(columnNames = {"email"})
})
public class User {
    // Setters
    @Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	private long id;
	
	
	private String name;
	private String username;
	private String email;
	private String password;
	private String avatar;

	private String roles;

	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL , fetch = FetchType.LAZY)
	private List<Blogs> blogs;

	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<Comments> comments;

}
