package it.unicam.cs.pawm.focusBack.dashboard;

import it.unicam.cs.pawm.focusBack.entry.Entry;
import it.unicam.cs.pawm.focusBack.entry.EntryRepository;
import it.unicam.cs.pawm.focusBack.security.config.JwtService;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EntryRepository entryRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public Integer[] getDataOfDay(String typeOfData, Integer year, Integer dayOfTheYear, String bearerToken){
        Integer userId;
        try{
            userId = this.userRepository
                    .findByEmail(
                            this.jwtService.getEmailFromBearerToken(bearerToken)
                    ).orElseThrow()
                    .getId();
        } catch (NoSuchElementException e){
            return new Integer[0];
        }
        List<Integer> toTransform = new ArrayList<>();
        int accumulator;
        for(int i = 0; i <= 23; i++){
            accumulator = 0;
            List<Entry> entries = this.entryRepository.findDataForChart1(year, dayOfTheYear, i, userId);
            if(entries.isEmpty()){
                toTransform.add(0);
            } else {
                accumulator = this.updateAccumulator(accumulator, entries, typeOfData);
                if(!typeOfData.equals("quantity")){
                    accumulator = accumulator/entries.size();
                }
                toTransform.add(accumulator);
            }
        }
        return toTransform.toArray(new Integer[toTransform.size()]);
    }

    public Integer[] getDataOfWeek(String typeOfData, Integer year, Integer weekOfTheYear, String bearerToken){
        Integer userId;
        try{
            userId = this.userRepository
                    .findByEmail(
                            this.jwtService.getEmailFromBearerToken(bearerToken)
                    ).orElseThrow()
                    .getId();
        } catch (NoSuchElementException e){
            return new Integer[0];
        }
        List<Integer> toTransform = new ArrayList<>();
        int accumulator;
        for(int i = 1; i <= 7; i++){
            accumulator = 0;
            List<Entry> entries = this.entryRepository.findDataForChart2(year, weekOfTheYear, i, userId);
            if(entries.isEmpty()){
                toTransform.add(0);
            } else {
                accumulator = this.updateAccumulator(accumulator, entries, typeOfData);
                if(!typeOfData.equals("quantity")){
                    accumulator = accumulator/entries.size();
                }
                toTransform.add(accumulator);
            }
        }
        return toTransform.toArray(new Integer[toTransform.size()]);
    }

    public Integer[] getDataOfYear(String typeOfData, Integer year, String bearerToken){
        Integer userId;
        try{
            userId = this.userRepository
                    .findByEmail(
                            this.jwtService.getEmailFromBearerToken(bearerToken)
                    ).orElseThrow()
                    .getId();
        } catch (NoSuchElementException e){
            return new Integer[0];
        }
        List<Integer> toTransform = new ArrayList<>();
        int accumulator;
        for(int i = 0; i <= 11; i++){
            accumulator = 0;
            List<Entry> entries = this.entryRepository.findDataForChart3(year, i, userId);
            if(entries.isEmpty()){
                toTransform.add(0);
            } else {
                accumulator = this.updateAccumulator(accumulator, entries, typeOfData);
                if(!typeOfData.equals("quantity")){
                    accumulator = accumulator/entries.size();
                }
                toTransform.add(accumulator);
            }
        }
        return toTransform.toArray(new Integer[toTransform.size()]);
    }

    private int updateAccumulator(int accumulator, List<Entry> entries, String typeOfData){
        for(Entry e : entries){
            switch (typeOfData) {
                case "quality" -> accumulator = accumulator + e.getQuality();
                case "quantity" -> accumulator = accumulator + e.getQuantity();
                case "completedTasks" -> accumulator = accumulator + e.getCompletedTasks();
            }
        }
        return accumulator;
    }
}
