import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VerificationRoutingModule} from './verification-routing.module';
import {IndexPageComponent} from './pages/index/index.component';
import {VerificationComponent} from './pages/verification/verification.component';
import {VerifyService} from './serices/verify.service';
import {EffectsModule} from '@ngrx/effects';
import {VerifyEffects} from './store/verify.effects';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VerificationDocumentComponent } from './components/verification-document/verification-document.component';

@NgModule({
  imports: [
    CommonModule,
    VerificationRoutingModule,
    EffectsModule.forFeature([VerifyEffects]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IndexPageComponent, VerificationComponent, VerificationDocumentComponent],
  providers: [VerifyService]
})
export class VerificationModule {
}
