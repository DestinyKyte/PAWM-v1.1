package it.unicam.cs.pawm.focusBack.entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EntryController {

    @Autowired
    private EntryService entryService;

    @PostMapping("/api/entries")
    public ResponseEntity<Entry> createEntry(@RequestBody Entry entry){
        return this.entryService.createEntry(entry);
    }

    //TODO just for the tests
    @PostMapping("/api/listOfEntries")
    public ResponseEntity<List<Entry>> createEntries(@RequestBody List<Entry> entries){
        return this.entryService.createEntries(entries);
    }

    //TODO: just for the tests
    @GetMapping("/api/entries")
    public Iterable<Entry> getAllEntries(){
        return this.entryService.getAllEntries();
    }


}
