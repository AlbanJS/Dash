package com.example.server.handlers.cocktail;

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
public class cocktail {
    private static final String apiKey = "d49255acd4msh748fdb797c57e54p121b9djsn50c0f5894669";
    private static final String apiHost = "the-cocktail-db.p.rapidapi.com";
    private static final String url = "https://the-cocktail-db.p.rapidapi.com/filter.php?";
    private final RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(path = "/find-cocktail", method = RequestMethod.GET)
    public ResponseEntity<String> cocktailApi(@RequestParam("i") String ingredient) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-RapidAPI-Key", apiKey);
        headers.add("X-RapidAPI-Host", apiHost);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(url + "i=" + ingredient, HttpMethod.GET, entity, String.class);
    }


}
