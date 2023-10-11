package it.unicam.cs.pawm.focusBack.user;

import it.unicam.cs.pawm.focusBack.entry.Entry;
import it.unicam.cs.pawm.focusBack.session.Session;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Session> sessions;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Entry> entries;
}
