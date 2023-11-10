package it.unicam.cs.pawm.focusBack.security.auth;

import it.unicam.cs.pawm.focusBack.security.config.JwtService;
import it.unicam.cs.pawm.focusBack.security.refreshToken.RefreshTokenRequest;
import it.unicam.cs.pawm.focusBack.security.refreshToken.RefreshToken;
import it.unicam.cs.pawm.focusBack.security.refreshToken.RefreshTokenService;
import it.unicam.cs.pawm.focusBack.user.Role;
import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class
AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;

    public ResponseEntity<RegistrationResponse> register(RegisterRequest request) throws Exception{
        var user = User.builder()
                .firstName(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        if(repository.findByEmail(user.getEmail()).isPresent())
            return new ResponseEntity<>(HttpStatus.FOUND);
        repository.save(user);
        //var jwtToken = jwtService.generateToken(user);
        var response = RegistrationResponse
                .builder()
                .reply("Registration Successful")
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public JwtAuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("no user found"));
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getEmail()); //new piece of code
        return JwtAuthenticationResponse.builder()
                .accessToken(jwtToken)
                .token(refreshToken.getToken())
                .build();
    }

    public ResponseEntity<JwtAuthenticationResponse> refreshToken(RefreshTokenRequest request) throws CredentialsExpiredException {
        try {
            return refreshTokenService.findByToken(request.getToken())
                    .map(refreshTokenService::verifyExpiration)
                    .map(RefreshToken::getUser)
                    .map(user -> {
                        String accessToken = jwtService.generateToken(user);
                        var response = JwtAuthenticationResponse.builder()
                                .accessToken(accessToken)
                                .token(refreshTokenService.createRefreshToken(user.getEmail()).getToken())
                                .build();
                        return ResponseEntity.ok(response);
                    }).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

}
