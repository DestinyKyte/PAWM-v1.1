package it.unicam.cs.pawm.focusBack.session;

import it.unicam.cs.pawm.focusBack.security.config.JwtService;
import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.naming.NamingException;
import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final JwtService jwtService;

    public ResponseEntity<Session> createSession(String bearerToken, Session session) throws NamingException {
        User userToUpdate;
        try{
            userToUpdate = this.userRepository.findByEmail(this.jwtService.getEmailFromBearerToken(bearerToken)).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new Session(), HttpStatus.NOT_FOUND);
        }
       /* //TODO use a query instead of this loop
        for(Session s : userToUpdate.getSessions()){
            if(s.getName().equals(session.getName())){
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }*/
        if(sessionRepository.findSessionByUserIdAndSessionName(userToUpdate.getId(), session.getName()) != null)
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

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
    public ResponseEntity<?> deleteSession(String bearerToken, String sessionName){
        User user;
        try{
            user = this.userRepository.findByEmail(this.jwtService.getEmailFromBearerToken(bearerToken)).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
        }
        Integer sessionID = this.sessionRepository.findSessionByUserIdAndSessionName(user.getId(), sessionName);
        if(sessionID != null){
            this.sessionRepository.deleteById(sessionID);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    //TODO: just for the tests
    public Iterable<Session> getAllSessions(){
        return this.sessionRepository.findAll();
    }
}
