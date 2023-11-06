package it.unicam.cs.pawm.focusBack.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //TODO: just for the tests
    public User createUser(User user) {
        return this.userRepository.save(user);
    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

}
