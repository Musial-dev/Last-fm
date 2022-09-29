import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LastFmService {

  BASE_URL: String = "http://ws.audioscrobbler.com";
  API_KEY: String = "23a0b977d2cfc8e809cc1fa1e7e31647";

  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };



  searchByAlbum(album: String): Observable<any>{
    return this.httpClient.post<any>(this.BASE_URL + "/2.0/?method=album.search&album=" + album + "&api_key=" + this.API_KEY + "&format=json", null);
  }

  searchByArtist(artist: String): Observable<any>{
    return this.httpClient.post<any>(this.BASE_URL + "/2.0/?method=artist.search&artist=" + artist + "&api_key=" + this.API_KEY + "&format=json", null);
  }
 
}
