package it.unicam.cs.pawm.focusBack.security.demo;

import it.unicam.cs.pawm.focusBack.security.auth.AuthenticationRequest;
import it.unicam.cs.pawm.focusBack.security.auth.AuthenticationService;
import it.unicam.cs.pawm.focusBack.security.auth.JwtAuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Login {

    private final AuthenticationService authenticationService;

    public Login(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var response = authenticationService.authenticate(request);
        return ResponseEntity.ok(response);
    }

    /*
    @GetMapping("/login")
    public String loginForm(){
        return "login/login";
    }
    */

}
