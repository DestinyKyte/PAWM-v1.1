package it.unicam.cs.pawm.focusBack.security.refreshToken;

import it.unicam.cs.pawm.focusBack.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
@Service
@RequiredArgsConstructor

public class RefreshTokenService {
    private final RefreshTokenRepo refreshTokenRepo;
    private final UserRepository userRepository;

    public RefreshToken createRefreshToken(String email){
        RefreshToken refreshToken;
        var user = userRepository.findByEmail(email);
        if(user.isPresent()){
           refreshTokenRepo.findByUser(user.get()).ifPresent(refreshTokenRepo::delete);
            refreshToken = RefreshToken.builder()
                .user(userRepository.findByEmail(email).isPresent()? user.get() : null)
                .token(UUID.randomUUID().toString())
                .expirationTime(Instant.now().plusMillis((1000*60*60*16))) //16 hour
                .build();
           return refreshTokenRepo.save(refreshToken);
        }
        else throw new NullPointerException("User with email "+email+" doesn't exist.");
    }

    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepo.findByToken(token);
    }

    //todo to test
    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpirationTime().compareTo(Instant.now())<=0){
            refreshTokenRepo.delete(token);
            throw new RuntimeException(token.getToken() + "has already expired");
        }
        return token;
    }

}
