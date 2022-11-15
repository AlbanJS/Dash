package com.example.server.handlers.spotify;

import com.neovisionaries.i18n.CountryCode;
import org.apache.hc.core5.http.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRefreshRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.data.artists.GetArtistsTopTracksRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchArtistsRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

@RestController
public class Spotify_handler {

    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:8080/spotify/callback");
    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId("9a707735b7d44db4b60cf94b854925fa")
            .setClientSecret("65767273a558475d95f3dcf7475e4778")
            .setRedirectUri(redirectUri)
            .build();
    private String code = "";

    @RequestMapping(path = "/spotify", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> spotifyLogin() {
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .scope("user-read-private, user-read-email, user-top-read")
                .show_dialog(true)
                .build();
        final URI uri = authorizationCodeUriRequest.execute();
        return new ResponseEntity<>(uri.toString(), HttpStatus.OK);
    }

    @RequestMapping(path = "/spotify/callback", method = RequestMethod.GET)
    public String getSpotifyUserCode(@RequestParam("code") String userCode, HttpServletResponse response) throws IOException {
        this.code = userCode;
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(this.code).build();

        try {
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());
        } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        response.sendRedirect("http://localhost:3000/");
        return spotifyApi.getAccessToken();
    }

    @RequestMapping(path = "/spotify/refresh", method = RequestMethod.GET)
    public static String authorizationCodeRefresh_Sync() {
        AuthorizationCodeRefreshRequest authorizationCodeRefreshRequest = spotifyApi.authorizationCodeRefresh(spotifyApi.getClientId(), spotifyApi.getClientSecret(), spotifyApi.getRefreshToken()).build();
        try {
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRefreshRequest.execute();
            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());
            spotifyApi.setRefreshToken(authorizationCodeCredentials.getRefreshToken());

            System.out.println("Expires in: " + authorizationCodeCredentials.getExpiresIn());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return spotifyApi.getAccessToken();
    }

    @RequestMapping(path = "/spotify/token", method = RequestMethod.GET)
    public ResponseEntity<String> getToken() {
        if (spotifyApi.getAccessToken() != null) {
            return new ResponseEntity<>(spotifyApi.getAccessToken(), HttpStatus.OK);
        }
        return new ResponseEntity<>("No token", HttpStatus.NO_CONTENT);
    }

    @RequestMapping(path = "/spotify/search-artists", method = RequestMethod.GET)
    public Artist[] searchArtists(@RequestParam("artist") String artist) {
        SearchArtistsRequest searchArtistsRequest = spotifyApi.searchArtists(artist)
                .limit(3)
                .build();
        try {
            final Paging<Artist> artistPaging = searchArtistsRequest.execute();
            System.out.println("Total: " + artistPaging.getTotal());
            return artistPaging.getItems();
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return new Artist[0];
    }

    @RequestMapping(path = "/spotify/top-track-artist/{id}", method = RequestMethod.GET)
    public ResponseEntity<Track[]> topTrackArtist(@PathVariable String id) {
        final CountryCode countryCode = CountryCode.SE;
        final GetArtistsTopTracksRequest getArtistsTopTracksRequest = spotifyApi
                .getArtistsTopTracks(id, countryCode)
                .build();
        try {
            final Track[] tracks = getArtistsTopTracksRequest.execute();
            return new ResponseEntity<>(tracks, HttpStatus.OK);
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return null;
    }

}
