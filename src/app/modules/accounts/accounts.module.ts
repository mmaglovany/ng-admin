import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountsRoutingModule} from './accounts-routing.module';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {ListComponent} from './pages/list/list.component';
import {AccountsService} from './services/accounts.service';
import {EffectsModule} from '@ngrx/effects';
import {AccountsEffect} from './store/accounts.effect';
import {VerifyResultPipe} from './pipes/verify-result.pipe';
import {AccountComponent} from './pages/account/account.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountsRoutingModule,
    EffectsModule.forFeature([AccountsEffect]),
    SharedModule
  ],
  declarations: [SidebarComponent, ListComponent, VerifyResultPipe, AccountComponent],
  providers: [AccountsService]
})
export class AccountsModule {
}
