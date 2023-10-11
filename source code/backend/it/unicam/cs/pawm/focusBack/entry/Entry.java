package it.unicam.cs.pawm.focusBack.entry;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private Integer userId;

    private Integer quality;

    private Integer quantity;

    private Integer completedTasks;

    //TODO
    //private List<Distraction> distractions;

    private Integer year;

    private Integer dayOfTheYear;

    private Integer hourOfTheDay;

    private Integer weekOfTheYear;

    private Integer dayOfTheWeek;

    private Integer month;

}
