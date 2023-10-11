package it.unicam.cs.pawm.focusBack.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;

@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("api/dashboard/dataOfDay/{typeOfData}/{year}/{dayOfTheYear}/{userId}")
    public Integer[] getDataOfDay(@PathVariable String typeOfData, @PathVariable Integer year, @PathVariable Integer dayOfTheYear, @PathVariable Integer userId){
        return this.dashboardService.getDataOfDay(typeOfData, year, dayOfTheYear, userId);
    }

    @GetMapping("api/dashboard/dataOfWeek/{typeOfData}/{year}/{weekOfTheYear}/{userId}")
    public Integer[] getDataOfWeek(@PathVariable String typeOfData, @PathVariable Integer year, @PathVariable Integer weekOfTheYear, @PathVariable Integer userId){
        return this.dashboardService.getDataOfWeek(typeOfData, year, weekOfTheYear, userId);
    }

    @GetMapping("api/dashboard/dataOfYear/{typeOfData}/{year}/{userId}")
    public Integer[] getDataOfYear(@PathVariable String typeOfData, @PathVariable Integer year, @PathVariable Integer userId){
        return this.dashboardService.getDataOfYear(typeOfData, year, userId);
    }

}
