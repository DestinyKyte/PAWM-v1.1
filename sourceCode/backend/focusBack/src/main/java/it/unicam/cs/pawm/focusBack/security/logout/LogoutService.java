package it.unicam.cs.pawm.focusBack.security.logout;

import it.unicam.cs.pawm.focusBack.security.config.JwtService;
import it.unicam.cs.pawm.focusBack.security.refreshToken.RefreshToken;
import it.unicam.cs.pawm.focusBack.security.refreshToken.RefreshTokenRepo;
import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogoutService {

    private final RefreshTokenRepo refreshTokenRepo;
    private final JwtService jwtService;
    private final UserService userService;

    public ResponseEntity<Object> deleteRefreshToken(String bearerToken){
        Optional<User> user = this.userService.findUserByEmail(this.jwtService.getEmailFromBearerToken(bearerToken));
        if(user.isPresent()){
            Optional<RefreshToken> token = this.refreshTokenRepo.findByUser(user.get());
            if(token.isPresent()){
                this.refreshTokenRepo.delete(token.get());
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
