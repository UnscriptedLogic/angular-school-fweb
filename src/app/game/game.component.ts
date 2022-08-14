import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import { LocationsService } from 'src/services/locations.service';
import { UsersService } from 'src/services/users-service.service';
import { GlobalVars } from '../globalvars';

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
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GameComponent implements OnInit {

  cardinalDirections: CardinalDirection[];
  selectedDirections: CardinalDirection[];
  areaNames: AreaName[];
  selectedAreaNames: AreaName[];
  streetName: string;
  answerStates = AnswerState;
  answerState: AnswerState = AnswerState.Neutral;

  interval;
  gameDuration: number;

  locations: any;
  imagePath: any;
  correctCardinal: string;
  correctAreaName: string;
  correctStreetName: string;

  prevQnIndex: number;
  locationsService: LocationsService;

  score: number = 0;

  navEndsubcription: any;
  userService: UsersService;

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

      this.locationsService = new LocationsService(http);
      this.userService = new UsersService(http);
   }

  async ngOnInit() {
    await this.getLocations();
    this.startCountdown();
    this.displayQuestion();

    this.navEndsubcription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.score = 0;
        clearInterval(this.interval);
        this.navEndsubcription.unsubscribe();
      }
    });
  }

  startCountdown() {
    this.gameDuration = GlobalVars.gameDuration;
    this.interval = setInterval(() => {
      if (this.gameDuration > 0) {
        this.gameDuration--;
      } else{
        this.concludeGame();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  async getLocations() {
    this.locations = await this.locationsService.getAllLocationsAsync();
  }

  nextQuestion() {

    if (!this.isAnswersCorrect()) {
      console.log("Wrong");
      return;
    }

    this.score+= 25;
    this.answerState = AnswerState.Correct;
    console.log("Correct. Moving on.")
    this.displayQuestion();
  }

  isAnswersCorrect(): boolean {
    var cardinal = "";
    var area = "";

    if (this.selectedDirections == null || this.selectedDirections.length == 0) {
      this.answerState = AnswerState.NoInputCardinal;
      return false;
    }

    if (this.selectedAreaNames == null || this.selectedAreaNames.length == 0) {
      this.answerState = AnswerState.NoInputArea;
      return false;
    }

    if (this.streetName == null) {
      this.answerState = AnswerState.NoInputStreet;
      return false;
    }

    for (let cardinalIndex = 0; cardinalIndex < this.selectedDirections.length; cardinalIndex++) {
      const cardinalItem = this.selectedDirections[cardinalIndex];
      cardinal += cardinalItem.direction;
    }

    for (let areaIndex = 0; areaIndex < this.selectedAreaNames.length; areaIndex++) {
      const areaItem = this.selectedAreaNames[areaIndex];
      area += areaItem.name;
    }

    if (cardinal != this.correctCardinal) {
      this.answerState = AnswerState.CardinalError;
      return false;
    }

    if (area != this.correctAreaName) {
      this.answerState = AnswerState.AreaError;
      return false;
    }

    if (this.streetName != this.correctStreetName) {
      this.answerState = AnswerState.StreetError;
      return false;
    }

    return true;
  }

  async displayQuestion() {
    var randomIndex = this.randomIntFromInterval(0, this.locations.length - 1);
    while (randomIndex == this.prevQnIndex) {
      randomIndex = this.randomIntFromInterval(0, this.locations.length - 1);
    }

    this.imagePath = this.locations[randomIndex].imageURL;
    this.correctCardinal = this.locations[randomIndex].cardinal;
    this.correctAreaName = this.locations[randomIndex].area;
    this.correctStreetName = this.locations[randomIndex].street;

    this.answerState = AnswerState.Neutral;
    this.prevQnIndex = randomIndex;
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async concludeGame() {

    if (this.score > GlobalVars.score) {
      console.log(GlobalVars.mongoID);
      console.log(this.score);
      await this.userService.updateUserScoreAsync(GlobalVars.mongoID, this.score);
    }
      
    this.router.navigate(['']);
  }
}
