import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexPageComponent} from './pages/index/index.component';
import {VerificationComponent} from './pages/verification/verification.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent
  },
  {
    path: ':pid',
    component: VerificationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule {
}
