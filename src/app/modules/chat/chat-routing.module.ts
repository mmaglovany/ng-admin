import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ChatPageComponent} from './pages/chat-page/chat-page.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent
  },
  {
    path: '',
    component: SidebarComponent,
    outlet: 'sidebar'
  },
  {
    path: ':pid',
    component: ChatPageComponent,
    data: {
      field: 'conversationPid'
    }
  },
  {
    path: 'user/:pid',
    component: ChatPageComponent,
    data: {
      field: 'userPid'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
