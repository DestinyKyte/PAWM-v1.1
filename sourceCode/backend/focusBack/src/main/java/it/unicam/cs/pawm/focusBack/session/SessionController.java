package it.unicam.cs.pawm.focusBack.session;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.NamingException;

@RestController
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @PostMapping("/api/v1/secured/sessions")
    public ResponseEntity<Session> createSession(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken, @RequestBody Session session) throws NamingException {
        return this.sessionService.createSession(bearerToken, session);
    }

    @GetMapping("/api/v1/secured/sessions")
    public ResponseEntity<Iterable<Session>> getAllUserSessions(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken){
        return this.sessionService.getAllUserSessions(bearerToken);
    }

    //TODO: just for the tests
    @GetMapping("/api/sessions")
    public Iterable<Session> getAllSessions(){
        return this.sessionService.getAllSessions();
    }

}
