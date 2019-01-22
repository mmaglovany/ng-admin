import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ListComponent} from './pages/list/list.component';
import {AccountComponent} from './pages/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: '',
    outlet: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'account',
    children: [
      {
        path: ':pid',
        component: AccountComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {
}
