package it.unicam.cs.pawm.focusBack.dashboard;

import it.unicam.cs.pawm.focusBack.entry.Entry;
import it.unicam.cs.pawm.focusBack.entry.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private EntryRepository entryRepository;

    public Integer[] getDataOfDay(String typeOfData, Integer year, Integer dayOfTheYear, Integer userId){
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

    public Integer[] getDataOfWeek(String typeOfData, Integer year, Integer weekOfTheYear, Integer userId){
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

    public Integer[] getDataOfYear(String typeOfData, Integer year, Integer userId){
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
