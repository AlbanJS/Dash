package com.example.server.repositories.user;

import com.example.server.models.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User_repository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
