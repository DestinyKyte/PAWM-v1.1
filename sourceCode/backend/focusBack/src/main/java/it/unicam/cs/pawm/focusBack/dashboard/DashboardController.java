package it.unicam.cs.pawm.focusBack.dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;

@RestController
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("api/v1/secured/dashboard/dataOfDay/{typeOfData}/{year}/{dayOfTheYear}")
    public Integer[] getDataOfDay(
            @PathVariable String typeOfData,
            @PathVariable Integer year,
            @PathVariable Integer dayOfTheYear,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken
    ){
        return this.dashboardService.getDataOfDay(typeOfData, year, dayOfTheYear, bearerToken);
    }

    @GetMapping("api/v1/secured/dashboard/dataOfWeek/{typeOfData}/{year}/{weekOfTheYear}")
    public Integer[] getDataOfWeek(
            @PathVariable String typeOfData,
            @PathVariable Integer year,
            @PathVariable Integer weekOfTheYear,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken
    ){
        return this.dashboardService.getDataOfWeek(typeOfData, year, weekOfTheYear, bearerToken);
    }

    @GetMapping("api/v1/secured/dashboard/dataOfYear/{typeOfData}/{year}")
    public Integer[] getDataOfYear(
            @PathVariable String typeOfData,
            @PathVariable Integer year,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken
    ){
        return this.dashboardService.getDataOfYear(typeOfData, year, bearerToken);
    }

}
