import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupportRoutingModule} from './support-routing.module';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {EffectsModule} from '@ngrx/effects';
import {SupportEffects} from './store/support.effects';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SharedModule} from '../shared/shared.module';
import {TicketPageComponent} from './pages/ticket-page/ticket-page.component';
import {SupportMessageFormComponent} from './forms/support-message-form/support-message-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import { SupportAttachmentsComponent } from './components/support-attachments/support-attachments.component';

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    SharedModule,
    EffectsModule.forFeature([SupportEffects])
  ],
  declarations: [IndexPageComponent, SidebarComponent, TicketPageComponent, SupportMessageFormComponent, SupportAttachmentsComponent]
})
export class SupportModule {
}
