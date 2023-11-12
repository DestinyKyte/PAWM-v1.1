package it.unicam.cs.pawm.focusBack.security.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.TimeZone;

@RestController
//@Controller
public class EmptyHomeController {

    //funzionava con @RestController e senza import
    @GetMapping("/resources/static/img/meme.jpg")
    public String getMeme(){
        return "<img src=\"meme.jpg\"></img>";
    }

    //funziona con @Controller e dentro resources/templates
    @GetMapping("/")
    public int getTest(){
        Calendar calendar = Calendar.getInstance();
        return calendar.getFirstDayOfWeek();
    }

    /*
    @GetMapping("/")
    public String getMeme(){
        return "meme";
    }
    */

    /*
    @GetMapping("/")
    public String getSomething(){
        return "index";
    }
    */

}
