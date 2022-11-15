package com.example.server.handlers.user;

import com.example.server.controllers.user.User_controller;
import com.example.server.models.user.User;
import com.example.server.models.widget.Widget;
import com.example.server.repositories.user.User_repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class User_handler {

    private final User_controller userController = new User_controller();
    private final User_repository userRepository;

    public User_handler(User_repository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public ResponseEntity<List<User>> GetUsers() {
        List<User> controller = this.userController.GetUsersController(userRepository);
        return new ResponseEntity<>(controller, HttpStatus.OK);
    }

    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public ResponseEntity<User> PostUser(@RequestBody User user) throws Exception {
        User controller = this.userController.PostUserController(user, userRepository);
        return new ResponseEntity<>(controller, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
    public Optional<User> getUser(@PathVariable String userId) throws Exception {
        Optional<User> controller = userController.GetUserController(userRepository, userId);
        return controller;
    }

    @CrossOrigin
    @RequestMapping(value = "/user/user-widget/{userId}", method = RequestMethod.PUT)
    public User updateUserWidget(@PathVariable String userId, @RequestBody List<Widget> widgets) throws Exception {
        User controller = userController.UpdateUserWidgetController(userRepository, userId, widgets);
        return controller;
    }

    @CrossOrigin
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.PUT)
    public User updateUser(@PathVariable String userId, @RequestBody User user) throws Exception {
        User controller = userController.UpdateUser(userRepository, userId, user);
        return controller;
    }

    @CrossOrigin
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable String userId) throws Exception {
        String controller = userController.DeleteUserController(userRepository, userId);
        return controller;
    }
}
