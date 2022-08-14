import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  url: string = "http://localhost:4201/api/locations/";

  constructor(private http: HttpClient) { }

  async getAllLocationsAsync() {
    var locations = [];
    await fetch(this.url).then(res => {
      return res.json();
    }).then(json => {
      locations = json;
      return json;
    });

    return locations;
  }
}
