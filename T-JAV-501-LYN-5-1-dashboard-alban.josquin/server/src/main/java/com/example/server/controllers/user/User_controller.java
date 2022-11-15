package com.example.server.controllers.user;

import com.example.server.models.user.User;
import com.example.server.models.widget.Widget;
import com.example.server.repositories.user.User_repository;
import com.example.server.repositories.user.User_requests;
import com.example.server.security.JwtToken;
import com.example.server.security.Password_manager;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class User_controller {

    private final User_requests request = new User_requests();
    private final Password_manager passwordManager = new Password_manager();
    private final JwtToken token = new JwtToken();

    public User PostUserController(User user, User_repository userRepository) throws Exception {
        user.setPassword(passwordManager.PasswordHash(user.getPassword()));
        User result = request.createNewUser(user, userRepository);
        return result;
    }

    public List<User> GetUsersController(User_repository userRepository) {
        List<User> result = request.getUsers(userRepository);
        return result;
    }

    public Optional<User> GetUserController(User_repository userRepository, String userId) throws Exception {
        Optional<User> result = request.getUser(userRepository, userId);
        return result;
    }

    public String DeleteUserController(User_repository userRepository, String userId) throws Exception {
        String result = request.deleteUser(userRepository, userId);
        return result;
    }

    public User UpdateUserWidgetController(User_repository userRepository, String userId, List<Widget> widgets) throws Exception {
        User result = request.updateUserWidget(userRepository, userId, widgets);
        return result;
    }

    public User UpdateUser(User_repository userRepository, String userId, User user) throws Exception {
        User result = request.updateUser(userRepository, userId, user);
        return result;
    }
}
