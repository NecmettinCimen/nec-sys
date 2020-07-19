import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { ModulEkleComponent } from './pages/moduller/modul-ekle/modul-ekle.component';
import { ModulListesiComponent } from './pages/moduller/modul-listesi/modul-listesi.component';
import { VeriListesiComponent } from './pages/veriler/veri-listesi/veri-listesi.component';
import { VeriEkleComponent } from './pages/veriler/veri-ekle/veri-ekle.component';
import { DosyaListesiComponent } from './pages/dosyalar/dosya-listesi/dosya-listesi.component';
import { DosyaEkleComponent } from './pages/dosyalar/dosya-ekle/dosya-ekle.component';
import { HomeComponent } from './pages/home/home.component';
import {
  DxDataGridModule,
  DxFormModule,
  DxButtonModule,
  DxResponsiveBoxModule,
  DxPopupModule,
  DxTextBoxModule,
  DxTextAreaModule
} from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'modul-ekle',
    component: ModulEkleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'modul-listesi',
    component: ModulListesiComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'modul-duzenle',
    component: ModulEkleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'veri-listesi',
    component: VeriListesiComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'veri-ekle',
    component: VeriEkleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'veri-duzenle',
    component: VeriEkleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dosya-listesi',
    component: DosyaListesiComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dosya-ekle',
    component: DosyaEkleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxResponsiveBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ModulEkleComponent,
    ModulListesiComponent,
    VeriListesiComponent,
    VeriEkleComponent,
    DosyaListesiComponent,
    DosyaEkleComponent,
  ],
})
export class AppRoutingModule {}
