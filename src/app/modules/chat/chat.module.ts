import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ChatPageComponent} from './pages/chat-page/chat-page.component';
import {ChatContainerComponent} from './containers/chat-container/chat-container.component';
import {EffectsModule} from '@ngrx/effects';
import {ChatEffect} from './store/chat.effects';
import {ChatService} from './store/chat.service';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/chat.reducer';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import {ChatListEntryComponent} from './components/chat-list-entry/chat-list-entry.component';
import {ChatMessageComponent} from './components/chat-message/chat-message.component';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ChatEffect]),
    StoreModule.forFeature('chat', reducer),
  ],
  declarations: [IndexPageComponent, SidebarComponent, ChatPageComponent, ChatContainerComponent, ChatListComponent, ChatListEntryComponent, ChatMessageComponent],
  providers: [ChatService]
})
export class ChatModule {
}
