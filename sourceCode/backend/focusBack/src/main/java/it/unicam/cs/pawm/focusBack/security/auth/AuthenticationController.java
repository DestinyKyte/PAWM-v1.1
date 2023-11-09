package it.unicam.cs.pawm.focusBack.security.auth;

import it.unicam.cs.pawm.focusBack.security.refreshToken.RefreshTokenRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(
            @RequestBody RegisterRequest request
    ) throws Exception {
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<JwtAuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
            return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest){
        try{
            return authenticationService.refreshToken(refreshTokenRequest);
        }
         catch(CredentialsExpiredException ex){
            return new ResponseEntity<>(HttpStatus.GONE);
        }
        catch(NullPointerException ex){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
