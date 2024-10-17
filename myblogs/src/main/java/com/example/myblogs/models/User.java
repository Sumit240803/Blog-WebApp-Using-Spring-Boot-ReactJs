package com.example.myblogs.models;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
}
