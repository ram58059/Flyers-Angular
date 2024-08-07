import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public mapFlag:boolean = false;
  public formFlag:boolean = false;
  public educationFlag:boolean = false;
  public sportsFlag:boolean = false;
  public codingFlag:boolean = false;
  public mepcoeventsFlag:boolean = false;
  public eventsFlag:boolean = true;
  public homeFlag:boolean = false;

  s:string = '';
  public signinFlag:boolean=true;
  public alertstring:string='';
  logoutButton: boolean = false;
  
  @Input() loginButton:boolean =false;
  @Input() username: string ='';
  
  constructor(private approot: AppComponent) {}

  logoutClicked() {
    this.logoutButton = true;
    this.eventsFlag = false;
    this.approot.reinitialise();
  }

  mapClicked() {
    this.mapFlag=true;
  }

  formClicked() {
    this.formFlag = ! this.formFlag;
  }

  ngOnInit(): void {
  }

  viewClicked(event: string) {
    this.homeFlag = true;
    this.eventsFlag = false;
    if(event === 'education') {
      this.educationFlag = true;
      this.codingFlag = this.sportsFlag = this.mepcoeventsFlag = false;
    } else if(event === 'coding') {
      this.codingFlag = true;
      this.mepcoeventsFlag = this.educationFlag = this.sportsFlag = false;
    } else if(event === 'sports') {
      this.sportsFlag = true;
      this.educationFlag = this.codingFlag = this.mepcoeventsFlag = false;
    } else if(event === 'mepcoevents') {
      this.mepcoeventsFlag = true;
      this.educationFlag = this.codingFlag = this.sportsFlag = false;
    }
  }
  editClicked(){}
  homeClicked() {
    this.eventsFlag=true;
    this.educationFlag = this.codingFlag = this.mepcoeventsFlag = this.sportsFlag = this.homeFlag = false;
  }

// **************************************************

}
