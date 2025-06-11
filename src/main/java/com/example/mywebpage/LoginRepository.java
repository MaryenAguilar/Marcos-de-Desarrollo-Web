package com.example.mywebpage;

import org.springframework.data.repository.CrudRepository;

public interface LoginRepository extends CrudRepository<Login, Integer> {
    // Puedes agregar métodos personalizados, por ejemplo:
    Login findByUser(String user);
}
