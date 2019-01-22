import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TicketPageComponent} from './pages/ticket-page/ticket-page.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  }, {
    path: '',
    component: SidebarComponent,
    outlet: 'sidebar'
  },
  {
    path: 'ticket',
    children: [
      {
        path: ':pid',
        component: TicketPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule {
}
