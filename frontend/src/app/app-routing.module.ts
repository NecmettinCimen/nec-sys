import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { ModulEkleComponent } from './pages/moduller/modul-ekle/modul-ekle.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DisplayDataComponent } from './pages/display-data/display-data.component';
import { DxDataGridModule, DxFormModule, DxButtonModule, DxResponsiveBoxModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'modul-ekle',
    component: ModulEkleComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'display-data',
    component: DisplayDataComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxResponsiveBoxModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent, ModulEkleComponent]
})
export class AppRoutingModule { }
