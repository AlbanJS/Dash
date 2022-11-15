package com.example.server.repositories.user;

import com.example.server.models.user.User;
import com.example.server.models.widget.Widget;

import java.util.List;
import java.util.Optional;

public class User_requests {

    public User createNewUser(User user, User_repository userRepository) throws Exception {
        try {
            if (user.getRole() == null) {
                user.setRole("USER");
            }
            return userRepository.save(user);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public List<User> getUsers(User_repository userRepository) {
        return userRepository.findAll();
    }

    public Optional<User> getUser(User_repository userRepository, String userId) throws Exception {
        try {
            return userRepository.findById(userId);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public User getUserByEmail(User_repository userRepository, String email) throws Exception {
        try {
            return userRepository.findByEmail(email);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public User updateUserWidget(User_repository userRepository, String userId, List<Widget> widgets) throws Exception {
        try {
            Optional<User> user = userRepository.findById(userId);
            user.get().setWidgets(widgets);
            return userRepository.save(user.get());
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public String deleteUser(User_repository userRepository, String userId) throws Exception {
        try {
            userRepository.deleteById(userId);
            return "User";
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public User updateUser(User_repository userRepository, String userId, User user) throws Exception {
        try {
            Optional<User> userDb = userRepository.findById(userId);
            userDb.get().setFirstname(user.getFirstname());
            userDb.get().setLastname(user.getLastname());
            userDb.get().setEmail(user.getEmail());
            return userRepository.save(userDb.get());
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
