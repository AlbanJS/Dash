package com.example.server.controllers.login;

import com.example.server.models.user.User;
import com.example.server.repositories.user.User_repository;
import com.example.server.repositories.user.User_requests;
import com.example.server.security.JwtToken;
import com.example.server.security.Password_manager;

public class Login_controller {
    private final JwtToken token = new JwtToken();
    private final Password_manager passwordManager = new Password_manager();
    private final User_requests request = new User_requests();

    public String LoginController(User_repository userRepository, User user) throws Exception {
        User userRequest = request.getUserByEmail(userRepository, user.getEmail());
        if (userRequest == null) {
            return "email or password incorrect";
        }
        boolean passwordMatch = passwordManager.PasswordVerify(user.getPassword(), userRequest.getPassword());
        if (!passwordMatch) {
            return "email or password incorrect";
        }
        return token.createToken(userRequest);
    }
}
