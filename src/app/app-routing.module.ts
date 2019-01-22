import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ForAuthGuard} from './modules/auth/guards/for-auth.guard';
import {InitModulesGuard} from './core/guards/init-modules.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
    canActivate: [InitModulesGuard]
  },
  {
    path: '',
    canActivate: [InitModulesGuard],
    children: [
      {
        path: '', redirectTo: '/accounts', pathMatch: 'full'
      },
      {
        path: 'verification',
        loadChildren: './modules/verification/verification.module#VerificationModule',
        canLoad: [ForAuthGuard],
      },
      {
        path: 'accounts',
        loadChildren: './modules/accounts/accounts.module#AccountsModule',
        canLoad: [ForAuthGuard],
      },
      {
        path: 'support',
        loadChildren: './modules/support/support.module#SupportModule',
        canLoad: [ForAuthGuard],
      },
      {
        path: 'chat',
        loadChildren: './modules/chat/chat.module#ChatModule',
        canLoad: [ForAuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
