package it.unicam.cs.pawm.focusBack.security.refreshToken;

import it.unicam.cs.pawm.focusBack.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String token;
    private Instant expirationTime;
    @OneToOne()
    @JoinColumn(name = "_user_id", referencedColumnName = "id")
    private User user;
}
