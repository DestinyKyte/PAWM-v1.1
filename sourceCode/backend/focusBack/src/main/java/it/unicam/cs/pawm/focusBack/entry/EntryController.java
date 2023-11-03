package it.unicam.cs.pawm.focusBack.entry;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EntryController {

    private final EntryService entryService;

    @PostMapping("/api/v1/secured/entries")
    public ResponseEntity<Entry> createEntry(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken, @RequestBody Entry entry){
        return this.entryService.createEntry(bearerToken, entry);
    }

    //TODO just for the tests
    @PostMapping("/api/v1/secured/listOfEntries")
    public ResponseEntity<List<Entry>> createEntries(@RequestBody List<Entry> entries){
        return this.entryService.createEntries(entries);
    }

    //TODO: just for the tests
    @GetMapping("/api/v1/secured/entries")
    public Iterable<Entry> getAllEntries(){
        return this.entryService.getAllEntries();
    }


}
