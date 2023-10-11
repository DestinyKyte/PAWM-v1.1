package it.unicam.cs.pawm.focusBack.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/api/sessions/{userId}")
    public ResponseEntity<Session> createSession(@PathVariable Integer userId, @RequestBody Session session){
        return this.sessionService.createSession(userId, session);
    }

    @GetMapping("/api/sessions/{userId}")
    public ResponseEntity<Iterable<Session>> getAllUserSessions(@PathVariable Integer userId){
        return this.sessionService.getAllUserSessions(userId);
    }

    //TODO: just for the tests
    @GetMapping("/api/sessions")
    public Iterable<Session> getAllSessions(){
        return this.sessionService.getAllSessions();
    }

}
