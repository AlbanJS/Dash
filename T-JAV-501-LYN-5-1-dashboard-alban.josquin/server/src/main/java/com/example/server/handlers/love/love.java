package com.example.server.handlers.love;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class love {
    private static final String apiKey = "f87e3b7420msha3d4e7878c0d970p1091b6jsnb0852f06c0b3";
    private static final String apiHost = "love-calculator.p.rapidapi.com";
    private static final String url = "https://love-calculator.p.rapidapi.com/getPercentage?";
    private final RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/find-love", method = RequestMethod.GET)
    public ResponseEntity<String> loveApi(@RequestParam("firstName") String firstName, @RequestParam("secondName") String secondName) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-RapidAPI-Key", apiKey);
        headers.add("X-RapidAPI-Host", apiHost);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(url + "fname=" + firstName + "&sname=" + secondName, HttpMethod.GET, entity, String.class);
    }
}
