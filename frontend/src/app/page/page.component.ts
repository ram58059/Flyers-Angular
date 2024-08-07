import { Component, OnInit } from '@angular/core';
import { CommdbutilityService } from '../commdbutility.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  t:any;
  map:string='';
  temp:boolean=true;
  formFlag:boolean=false;
  updateFlag:boolean=false;
  saveFlag:boolean=false;
  sclick:boolean=false;
  formButton:any;
  updateButton:any;

  nameFlag:boolean=false;
  detailFlag:boolean=false;
  locationFlag:boolean=false;
  imgFlag:boolean=false;
  mapFlag:boolean=false;
  dateFlag:boolean=false;

  listOfEvents=[{title:'Education', name:'',detail:'',location:'',map:'',date:'',img:'',no:''}];
  formEvent={title:'Education', name:'',detail:'',location:'',map:'',date:'',img:'',no:''};
  updateEvent={title:'Education', name:'',detail:'',location:'',map:'',date:'',img:'',no:''};

  insertString:string='';
  alert:string='';
  selectedNo:number=0;
  change={title:'Education',name:'',value:''};

  present:boolean=false;
  past:boolean=false;
  future:boolean=false;

  model: any;

  constructor(private mydb: CommdbutilityService) { 


    this.mydb.listEducationService(this.formEvent.title).subscribe( data => {
      
      if(data['message']) {
        this.listOfEvents = data['docList'];
        this.selectedNo = this.listOfEvents.length-1;
      }
    })
  }

  mapClicked(index: any) {
    this.t = index;
    this.map = this.listOfEvents[this.t].map;
    this.mapFlag=true;
  }

  formClicked() {
    window.scrollTo(0,0);
    this.formFlag = !this.formFlag;
    this.nameFlag=this.detailFlag=this.locationFlag=this.mapFlag=this.dateFlag=this.imgFlag=false;
    this.formButton=true;
    this.updateFlag = false;
    this.formEvent={title:'Education', name:'',detail:'',location:'',map:'',date:'',img:'',no:''};
  
  }

  deleteClicked(index: any) {
    // this.listOfEvents.splice(index,1);
    this.mydb.deleteEducationService(this.formEvent.title,this.listOfEvents[index].name).subscribe(data => {
      if(data['message']) {
        this.insertString = 'Successfully deleted';
        this.listOfEvents.splice(parseInt(index),1);
        this.selectedNo = this.selectedNo -1;
      }
    })
  }

  formSubmitClicked() {
    this.formEvent.no=String(this.selectedNo + 1);
    this.formEvent.img="../../assets/img/education/"+this.formEvent.img.replace("C:\\fakepath\\","");
    this.mydb.insertEducationService(this.formEvent).subscribe(data=> {
      if(data['message']) {
        this.insertString='Successfully inserted';
        this.listOfEvents.push(this.formEvent);
        this.selectedNo = this.selectedNo + 1;
        this.formEvent = {title:'Education', name:'',detail:'',location:'',map:'',date:'',img:'',no:''};
      }
    });
    this.formFlag=false;
  }

  nameClicked() {
    this.sclick=!this.sclick;
    this.saveFlag=true;
    this.change.name='name';
    this.change.value=this.updateEvent.name;
  }
  detailClicked() {
    this.saveFlag=true;
    this.change.name='detail';
    this.change.value=this.updateEvent.detail;
  }
  locationClicked() {
    this.saveFlag=true;
    this.change.name='location';
    this.change.value=this.updateEvent.location;
  }
  imgClicked() {
    this.saveFlag=true;
    this.updateEvent.img="../../assets/img/education/"+this.updateEvent.img.replace("C:\\fakepath\\","");
    this.change.name='img';
    this.change.value=this.updateEvent.img;
  }
  mapEditClicked() {
    this.saveFlag=true;
    this.change.name='map';
    this.change.value=this.updateEvent.map;
  }
  dateClicked() {
    this.saveFlag=true;
    this.change.name='date';
    this.change.value=this.updateEvent.date;
  }
  updateClicked(index:number) {
    window.scrollTo(0,0);
    this.nameFlag=this.detailFlag=this.locationFlag=this.mapFlag=this.dateFlag=this.imgFlag=true;
    this.updateFlag=!this.updateFlag;
    this.updateEvent=this.listOfEvents[index];
    this.formEvent=this.listOfEvents[index];
    this.formFlag = false;
  }
  updateSubmitClicked() {
    if(this.saveFlag) {
      this.mydb.updateEducationService(this.formEvent.name,this.change).subscribe(data=> {
        if(data['message']) {
          this.insertString='Successfully updated';
          this.formEvent = {title:'Education', name:'',detail:'',location:'',map:'',date:'',img:'',no:''};
        }
      });
      this.updateFlag=false;
    } else {
      this.alert = '* Click save button';
    }
  }
  
  ngOnInit(): void {
  }

  

}
