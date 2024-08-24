import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackDetailsComponent } from './pages/track-details/track-details.component';

const routes: Routes = [

  {path:'project/:id',component:TracksComponent},
  {path:'detail/:id',component:TrackDetailsComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksRoutingModule { }
