import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { VideoSuccessComponent } from './ui/video-success/video-success.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');


const routes: Routes = [
  { path: '', component: ReadmePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'externalRedirect',
    resolve: {
        url: externalUrlProvider,
    },
    // We need a component here because we cannot define the route otherwise
    component: VideoSuccessComponent,
    canActivate: [externalUrlProvider]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,
    {
      provide: externalUrlProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
          const externalUrl = route.paramMap.get('externalUrl');
          window.open(externalUrl, '_self');
      },
  },]
})

export class AppRoutingModule { }

