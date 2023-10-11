package it.unicam.cs.pawm.focusBack.session;

import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
public class SessionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SessionRepository sessionRepository;

    public ResponseEntity<Session> createSession(Integer userId, Session session) {
        User userToUpdate;
        try{
            userToUpdate = this.userRepository.findById(userId).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new Session(), HttpStatus.NOT_FOUND);
        }
        userToUpdate.getSessions().add(session);
        this.userRepository.save(userToUpdate);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    public ResponseEntity<Iterable<Session>> getAllUserSessions(Integer userId){
        User user;
        try{
            user = this.userRepository.findById(userId).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.getSessions(), HttpStatus.OK);
    }

    //TODO: just for the tests
    public Iterable<Session> getAllSessions(){
        return this.sessionRepository.findAll();
    }
}
