import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';
import { CommdbutilityService } from './commdbutility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title: string = 'Globe';

  loginForm!: FormGroup;
  isLoggedin: boolean = false;  
  loadingFlag: boolean = false;
  bFlag: boolean = false;
  signup:boolean = false;
  username: string = '';
  txt: string='Sign In';
  userExistTxt: string='';

  loginDetails = {username: '', password: '', email: ''};
  
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private mydb: CommdbutilityService
  ) {}

  reinitialise() {
    this.isLoggedin= false;  
    this.bFlag = false;
    this.signup = false;
    this.username = '';
    this.txt='Sign In';
    this.userExistTxt='';

    this.loginDetails = {username: '', password: '', email: ''};
  }

  callBackend() {
    this.loadingFlag = true;
    if (this.signup) {
      if (this.loginDetails.username === '' || this.loginDetails.email === '' || this.loginDetails.password == '') {
        this.userExistTxt = '* Fill all details'
      } else {
        this.mydb.insertUserService(this.loginDetails).subscribe(data => {
          if (data['message']) {
            this.username = data['username'];
            this.isLoggedin = true;
          } else {
            this.userExistTxt = '* user already exists. Sign In';
          }
        });
      }
    }
    else {
      this.mydb.loginUserService(this.loginDetails).subscribe((data) => {
        if (data['message']) {
          this.username = data['username'];
          this.isLoggedin = true;
        } else {
          this.userExistTxt = '* No Account found. Sign Up';
        }
      });
    }
    this.loadingFlag = false;
  }

  signupClicked() {
    this.signup = true;
    this.txt='Sign Up';   
    this.userExistTxt = ''; 
  }
  signinClicked() {
    this.signup = false;
    this.txt='Sign In';
    this.userExistTxt = ''; 
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      if(user != null) {
        if (this.signup) {
          this.mydb.insertGuserService({username: user.name, email: user.email}).subscribe(data => {
            if (data['message']) {
              this.username = data['username'];
              this.isLoggedin = true;
            } else {
              this.userExistTxt = '* user already exists. Sign In';
            }
          })
        } else {
          this.mydb.loginGuserService({username: user.name, email: user.email}).subscribe(data => {
            if (data['message']) {
              this.username = data['username'];
              this.isLoggedin = true;
            } else {
              this.userExistTxt = '* No Account found. Sign Up';
            }
          });
        } 
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.isLoggedin=false;
    this.signup=false;
    this.txt='Sign In';
    this.socialAuthService.signOut();
  }

}
