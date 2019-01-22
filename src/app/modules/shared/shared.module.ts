import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountCardComponent} from './components/account-card/account-card.component';
import {VerifyStatusComponent} from './components/verify-status/verify-status.component';
import {RouterModule} from '@angular/router';
import {AccountTitleComponent} from './components/account-title/account-title.component';
import {ModalWindowModule} from './modal-window/modal-window.module';
import {ProtoService} from './proto/proto.service';
import {ConnectionStateComponent} from './components/connection-state/connection-state.component';
import {ClarityModule} from '@clr/angular';
import {OrderByPipe} from './pipes/order-by.pipe';
import {PaginationComponent} from './components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalWindowModule,
    ClarityModule
  ],
  declarations: [AccountCardComponent, VerifyStatusComponent, AccountTitleComponent,
    ConnectionStateComponent, OrderByPipe, PaginationComponent],
  exports: [AccountCardComponent, VerifyStatusComponent, AccountTitleComponent,
    ConnectionStateComponent, OrderByPipe, PaginationComponent],
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [ProtoService]
    };
  }
}
