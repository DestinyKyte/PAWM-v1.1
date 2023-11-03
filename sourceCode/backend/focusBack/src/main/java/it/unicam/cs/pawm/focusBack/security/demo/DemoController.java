package it.unicam.cs.pawm.focusBack.security.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/secured")
public class DemoController {


    @GetMapping("/demo-controller")
    public ResponseEntity<WrapperTokenResponse> sayHello(){
        return ResponseEntity.ok(new WrapperTokenResponse("hello from secured demo"));
    }

}
