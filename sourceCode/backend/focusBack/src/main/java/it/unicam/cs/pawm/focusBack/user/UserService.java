package it.unicam.cs.pawm.focusBack.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //TODO: just for the tests
    public User createUser(User user) {
        return this.userRepository.save(user);
    }
}
