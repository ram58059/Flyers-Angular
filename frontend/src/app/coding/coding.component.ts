import { Component, OnInit } from '@angular/core';
import { CommdbutilityService } from '../commdbutility.service';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent implements OnInit {

  t:any;
  map:string='';
  temp:boolean=true;
  formFlag:boolean=false;
  updateFlag:boolean=false;
  saveFlag:boolean=false;
  formButton:any;
  updateButton:any;

  nameFlag:boolean=false;
  detailFlag:boolean=false;
  imgFlag:boolean=false;
  urlFlag:boolean=false;
  dateFlag:boolean=false;

  listOfEvents=[{title:'Coding', name:'',detail:'',url:'',date:'',img:'',no:''}];
  formEvent={title:'Coding', name:'',detail:'',url:'',date:'',img:'',no:''};
  updateEvent={title:'Coding', name:'',detail:'',url:'',date:'',img:'',no:''};

  insertString:string='';
  alert:string='';
  selectedNo:number=0;
  change={title:'Coding',name:'',value:''};

  model: any;

  constructor(private mydb: CommdbutilityService) { 
    this.mydb.listEducationService(this.formEvent.title).subscribe( data => {
      if(data['message']) {
        this.listOfEvents = data['docList'];
        this.selectedNo = this.listOfEvents.length-1;
      }
    })
  }

  formClicked() {
    window.scrollTo(0,0);
    this.formFlag = !this.formFlag;
    this.nameFlag=this.detailFlag=this.urlFlag=this.dateFlag=this.imgFlag=false;
    this.updateFlag = false;
    this.formEvent={title:'Coding', name:'',detail:'',url:'',date:'',img:'',no:''};
  }

  deleteClicked(index: any) {
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
    this.formEvent.img="../../assets/img/coding/"+this.formEvent.img.replace("C:\\fakepath\\","");
    this.mydb.insertEducationService(this.formEvent).subscribe(data=> {
      if(data['message']) {
        this.insertString='Successfully inserted';
        this.listOfEvents.push(this.formEvent);
        this.selectedNo = this.selectedNo + 1;
        this.formEvent = {title:'Education', name:'',detail:'',url:'',date:'',img:'',no:''};
      }
    });
    this.formFlag=false;
  }

  nameClicked() {
    this.saveFlag=true;
    this.change.name='name';
    this.change.value=this.updateEvent.name;
  }
  detailClicked() {
    this.saveFlag=true;
    this.change.name='detail';
    this.change.value=this.updateEvent.detail;
  }
  urlClicked() {
    this.saveFlag=true;
    this.change.name='url';
    this.change.value=this.updateEvent.url;
  }
  imgClicked() {
    this.saveFlag=true;
    this.updateEvent.img="../../assets/img/coding/"+this.updateEvent.img.replace("C:\\fakepath\\","");
    this.change.name='img';
    this.change.value=this.updateEvent.img;
  }
  dateClicked() {
    this.saveFlag=true;
    this.change.name='date';
    this.change.value=this.updateEvent.date;
  }
  updateClicked(index:number) {
    window.scrollTo(0,0);
    this.nameFlag=this.detailFlag=this.urlFlag=this.dateFlag=this.imgFlag=true;
    this.updateFlag=true;
    this.updateEvent=this.listOfEvents[index];
    this.formEvent=this.listOfEvents[index];
    this.formFlag = false;
  }
  updateSubmitClicked() {
    if(this.saveFlag) {
      this.mydb.updateEducationService(this.formEvent.name,this.change).subscribe(data=> {
        if(data['message']) {
          this.insertString='Successfully updated';
          this.formEvent = {title:'Coding', name:'',detail:'',url:'',date:'',img:'',no:''};
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

