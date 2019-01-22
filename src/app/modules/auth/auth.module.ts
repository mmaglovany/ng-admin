import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth.effects';
import {ForAuthGuard} from './guards/for-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginPageComponent]
})
export class AuthModule {

  static forRoot() {
    return {
      ngModule: AuthModule,
      providers: [ForAuthGuard]
    };
  }

}
