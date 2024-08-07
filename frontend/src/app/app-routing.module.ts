import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingComponent } from './coding/coding.component';
import { MepcoeventsComponent } from './mepcoevents/mepcoevents.component';
import { PageComponent } from './page/page.component';
import { SportsComponent } from './sports/sports.component';

const routes: Routes = [
  {path:'page',component:PageComponent},
  {path:'coding',component:CodingComponent},
  {path:'mepcoevents',component:MepcoeventsComponent},
  {path:'sports',component:SportsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
