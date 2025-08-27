package com.example.mywebpage;

import org.springframework.data.repository.CrudRepository;

public interface LoginRepository extends CrudRepository<Login, Integer> {
    Login findByUser(String user);
}
