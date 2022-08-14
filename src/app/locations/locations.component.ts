import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationsService } from 'src/services/locations.service';

interface CardinalDirection {
  direction: string;
}

interface AreaName {
  name: string;
}

enum AnswerState {
  Correct,
  CardinalError,
  AreaError,
  StreetError,
  NoInputCardinal,
  NoInputArea,
  NoInputStreet,
  Neutral
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  cardinalDirections: CardinalDirection[];
  selectedDirections: CardinalDirection[];
  areaNames: AreaName[];
  selectedAreaNames: AreaName[];
  streetName: string;

  answerStates = AnswerState;
  answerState: AnswerState = AnswerState.Neutral;

  imagePath: any;

  locationService: LocationsService;

  constructor(private router: Router, private http: HttpClient) {
    this.cardinalDirections = [
      { direction: 'North'},
      { direction: 'East'},
      { direction: 'South'},
      { direction: 'West'},
      { direction: 'Central'}
  ];

  this.areaNames = [
      { name: 'Aljunied'},
      { name: 'Ang Mo Kio'},
      { name: 'Bedok'},
      { name: 'Bukit Timah'},
      { name: 'Chinatown'},
      { name: 'Changi'},
      { name: 'Commonwealth'},
      { name: 'Expo'},
      { name: 'Jurong'},
      { name: 'Kallang'},
      { name: 'Mandai'},
      { name: 'Marina Bay'},
      { name: 'Orchard'},
      { name: 'Pasir Ris'},
      { name: 'Paya Lebar'},
      { name: 'Queenstown'},
      { name: 'Raffles Place'},
      { name: 'Simei'},
      { name: 'Seletar'},
      { name: 'Sentosa'},
      { name: 'Tampines'},
      { name: 'Tanah Merah'},
    ];

    this.locationService = new LocationsService(http);
   }

  ngOnInit(): void {
  }

  async addLocation() {
    var dirString = "";
    for (let i = 0; i < this.selectedDirections.length; i++) {
      const direction = this.selectedDirections[i];
      dirString += direction.direction;
    }

    var areaString = "";
    for (let x = 0; x < this.selectedAreaNames.length; x++) {
      const area = this.selectedAreaNames[x];
      areaString += area.name;
    }

    await this.locationService.addLocationAsync(this.imagePath, dirString, areaString, this.streetName);
    this.router.navigate(['']);
  }
}
