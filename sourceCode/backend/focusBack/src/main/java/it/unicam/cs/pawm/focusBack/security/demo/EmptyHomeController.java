package it.unicam.cs.pawm.focusBack.security.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String getTest(){
        return "index";
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
