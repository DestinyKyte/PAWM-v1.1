package it.unicam.cs.pawm.focusBack.security.logout;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LogoutController {

    private final LogoutService logoutService;

    @PostMapping("/api/v1/secured/logout")
    public ResponseEntity<Object> logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken){
        return this.logoutService.deleteRefreshToken(bearerToken);
    }

}
