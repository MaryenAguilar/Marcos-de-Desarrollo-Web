package com.example.mywebpage;

import jakarta.persistence.*;

@Entity
@Table(name="login1")
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String lastname;

    private String user;

    private String password;

    private String role;  // ✅ Campo de rol agregado

    // Getters y setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // ✅ Getter y Setter del campo 'role'
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
