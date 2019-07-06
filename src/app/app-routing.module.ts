import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickLinksComponent } from './components/quick-links/quick-links.component';

const routes: Routes = [
  {
    path: 'landing',
    component: QuickLinksComponent
  },
  {
    path:'**',
    redirectTo: 'landing',
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
