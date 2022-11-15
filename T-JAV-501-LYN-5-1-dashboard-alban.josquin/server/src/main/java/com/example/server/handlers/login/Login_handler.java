package com.example.server.handlers.login;

import com.example.server.controllers.login.Login_controller;
import com.example.server.models.user.User;
import com.example.server.repositories.user.User_repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Login_handler {
    private final Login_controller loginController = new Login_controller();
    private final User_repository userRepository;

    public Login_handler(User_repository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> Login(@RequestBody User user) throws Exception {
        String controller = loginController.LoginController(userRepository, user);
        if (controller == "email or password incorrect") {
            return new ResponseEntity<>(controller, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(controller, HttpStatus.OK);
    }

}
