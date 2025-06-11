package com.example.mywebpage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/login")
public class LoginController {

    @Autowired
    private LoginRepository loginRepository;

    @PostMapping(path = "/add")
    public String addUser(@RequestParam String name,
                          @RequestParam String lastname,
                          @RequestParam String user,
                          @RequestParam String password) {
        Login login = new Login();
        login.setName(name);
        login.setLastname(lastname);
        login.setUser(user);
        login.setPassword(password);
        loginRepository.save(login);
        return "User saved successfully";
    }

    @GetMapping(path = "/all")
    public Iterable<Login> getAllUsers() {
        return loginRepository.findAll();
    }
}

