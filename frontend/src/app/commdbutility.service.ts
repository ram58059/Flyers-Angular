import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommdbutilityService {
  url:string = 'https://sleepy-forest-09900.herokuapp.com/'

  constructor(private http: HttpClient) { }

  listEducationService(title: string): Observable<any> {
    return this.http.get(this.url+'list?title='+title);
  }

  insertEducationService(insertElement: any): Observable<any> {
    return this.http.get(this.url+'insert?title='+insertElement.title+'&name='+insertElement.name+'&detail='+insertElement.detail+'&location='+insertElement.location
      +'&map='+insertElement.map+'&date='+insertElement.date+'&img='+insertElement.img+'&no='+insertElement.no);
  }

  updateEducationService(name:string, change:any): Observable<any> {
    return this.http.get(this.url+'update?title='+change.title+'&name='+name+'&changename='+change.name+'&changevalue='+change.value);

  }

  deleteEducationService(title: string,deletename: any): Observable<any> {
    return this.http.get(this.url + 'delete?title='+title+'&name='+deletename);
  }

  loginUserService(element: any): Observable<any> {
    return this.http.get(this.url + 'loginuser?email='+element.email+'&password='+element.password);
  }

  insertUserService(element: any): Observable<any> {
    return this.http.get(this.url + 'insertuser?username='+element.username+'&email='+element.email+'&password='+element.password);
  }

  loginGuserService(element: any): Observable<any> {
    return this.http.get(this.url + 'loginguser?username='+element.username+'&email='+element.email);
  }

  insertGuserService(element: any): Observable<any> {
    return this.http.get(this.url + 'insertguser?username='+element.username+'&email='+element.email);
  }

}
