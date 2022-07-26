import { Component, OnInit } from '@angular/core';

interface CardinalDirection {
  direction: string;
}

interface AreaName {
  name: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  cardinalDirections: CardinalDirection[];
  selectedDirections: CardinalDirection[];

  areaNames: AreaName[];
  selectedAreaNames: AreaName[];

  streetName: string;

  constructor() {
      this.cardinalDirections = [
          { direction: 'North'},
          { direction: 'East'},
          { direction: 'South'},
          { direction: 'West'}
      ];

      this.areaNames = [
          { name: 'Pasir Ris'},
          { name: 'Paya Lebar'},
          { name: 'Tampines'},
          { name: 'Bedok'},
          { name: 'Aljunied'},
          { name: 'Kallang'},
          { name: 'Mandai'},
          { name: 'Queenstown'},
          { name: 'Commonwealth'},
          { name: 'Jurong'},
          { name: 'Bukit Timah'},
          { name: 'Chinatown'},
          { name: 'Marina Bay'},
        ]
   }

  ngOnInit(): void {
  }
}
