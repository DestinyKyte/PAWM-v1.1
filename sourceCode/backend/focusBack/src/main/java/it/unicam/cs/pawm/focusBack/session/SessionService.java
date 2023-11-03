package it.unicam.cs.pawm.focusBack.session;

import it.unicam.cs.pawm.focusBack.security.config.JwtService;
import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final UserRepository userRepository;

    private final SessionRepository sessionRepository;

    private final JwtService jwtService;

    public ResponseEntity<Session> createSession(String bearerToken, Session session) {
        User userToUpdate;
        try{
            userToUpdate = this.userRepository.findByEmail(this.jwtService.getEmailFromBearerToken(bearerToken)).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new Session(), HttpStatus.NOT_FOUND);
        }
        userToUpdate.getSessions().add(session);
        this.userRepository.save(userToUpdate);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    public ResponseEntity<Iterable<Session>> getAllUserSessions(String bearerToken){
        User user;
        try{
            user = this.userRepository.findByEmail(this.jwtService.getEmailFromBearerToken(bearerToken)).orElseThrow();
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

/*
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

 */
