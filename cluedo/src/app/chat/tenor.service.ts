import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class TenorService {
    apiKey: string = "AIzaSyBd-ORku2q-cF9g-rO5UUukLFRMUCAAmCs"

    constructor(private http: HttpClient) { }

    searchGifs(query: string) {
        const url = `https://api.tenor.com/v1/search?q=${query}&key=${this.apiKey}`;
        return this.http.get(url);
    }
}
