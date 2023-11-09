package it.unicam.cs.pawm.focusBack.session;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SessionRepository extends CrudRepository<Session, Integer> {

    @Query(value = "SELECT s.id\n" +
            "FROM session as s\n" +
            "JOIN _user as u \n" +
            "on s._user_id = u.id\n" +
            "WHERE s._user_id = :userId\n" +
            "and s.name = :sessionName",
            nativeQuery = true
    )
    Integer findSessionByUserIdAndSessionName(int userId, String sessionName);
}
