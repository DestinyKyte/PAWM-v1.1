package it.unicam.cs.pawm.focusBack.entry;

import it.unicam.cs.pawm.focusBack.security.config.JwtService;
import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class EntryService {

    private final UserRepository userRepository;
    private final EntryRepository entryRepository;
    private final JwtService jwtService;

    public ResponseEntity<Entry> createEntry(String bearerToken, Entry entry){
        User userToUpdate;
        try{
            userToUpdate = this.userRepository.findByEmail(this.jwtService.getEmailFromBearerToken(bearerToken)).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new Entry(), HttpStatus.NOT_FOUND);
        }
        entry.setUserId(userToUpdate.getId());

        Calendar calendar = Calendar.getInstance();
        entry.setYear(calendar.get(Calendar.YEAR));
        entry.setDayOfTheYear(calendar.get(Calendar.DAY_OF_YEAR));
        entry.setHourOfTheDay(calendar.get(Calendar.HOUR_OF_DAY));
        entry.setWeekOfTheYear(calendar.get(Calendar.WEEK_OF_YEAR));
        entry.setDayOfTheWeek(calendar.get(Calendar.DAY_OF_WEEK));
        entry.setMonth(calendar.get(Calendar.MONTH));

        userToUpdate.getEntries().add(entry);
        this.userRepository.save(userToUpdate);
        return new ResponseEntity<>(entry, HttpStatus.OK);
    }

    // TODO: just for the tests
    public ResponseEntity<List<Entry>> createEntries(List<Entry> entries) {
        //TODO controllo che se non viene inserito il campo userId di Entry l'eccezione viene catturata
        User userToUpdate;
        try{
            userToUpdate = this.userRepository.findById(entries.get(0).getUserId()).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
        }
        for(Entry e : entries){
            userToUpdate.getEntries().add(e);
        }
        this.userRepository.save(userToUpdate);
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    //TODO: just for the tests
    public Iterable<Entry> getAllEntries() {
        return this.entryRepository.findAll();
    }
}
