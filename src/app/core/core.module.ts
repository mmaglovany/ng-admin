import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {reducers, metaReducers} from './reducers/core.reducer';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AjaxInterceptor} from './services/ajax.interceptor';
import {InitModulesGuard} from './guards/init-modules.guard';
import {SocketService} from './services/socket.service';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
  ],
  declarations: []
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        InitModulesGuard,
        SocketService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AjaxInterceptor,
          multi: true,
        }
      ]
    };
  }
}
