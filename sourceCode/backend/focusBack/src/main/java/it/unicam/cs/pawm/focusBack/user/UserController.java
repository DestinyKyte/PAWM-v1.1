package it.unicam.cs.pawm.focusBack.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //TODO: just for the tests
    @PostMapping("/api/users")
    public User createUser(@RequestBody User user){
        return this.userService.createUser(user);
    }

}
