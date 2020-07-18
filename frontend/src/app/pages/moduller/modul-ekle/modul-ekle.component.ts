import { Component } from '@angular/core';
import { Modul } from '../../../models/Modul';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ApiUtilService } from 'src/app/services/api-util.service';
@Component({
  templateUrl: 'modul-ekle.component.html',
})
export class ModulEkleComponent {
  modul: any;
  alanlar: Array<any>;
  colCountByScreen: object;
  id: string;
  silPopupShow: boolean = false;
  uyariPopupShow: boolean = false;
  bosalanad: string = '';

  public silVisible() {
    return !isNullOrUndefined(this.id);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiUtil: ApiUtilService
  ) {
    this.modul = {
      ad: '',
      aciklama: '',
      aktif: true,
    };
    this.alanlar = [];
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    };
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.silVisible()) this.modulGetir();
  }

  private async modulGetir() {
    var result = await this.apiUtil.get<any>(`/Modul/${this.id}`);

    this.modul = {
      ad: result.ad,
      aciklama: result.aciklama,
      aktif: result.aktif,
    };
    this.alanlar = result.alanlar;
  }

  public alanEkle() {
    let id = this.alanlar.length + 1;
    this.alanlar.push({ id: id, ad: '', tip: '', ilkdeger: '' });
  }
  public alanKaldir(item: any) {
    this.alanlar = this.alanlar.filter((f) => f.id != item.id);
  }
  public async modulKaydet() {
    if (this.modul.ad === '') {
      this.bosalanad = 'Modül Adı';
      this.uyariPopupShow = true;
      return;
    }
    let values = JSON.stringify({
      ad: this.modul.ad,
      eskiad: this.id,
      aciklama: this.modul.aciklama,
      aktif: this.modul.aktif,
      alanlar: this.alanlar,
    });
    let modul = new Modul(values);

    var result = await this.apiUtil.post<any>('/Modul', modul);

    if (result.success) this.router.navigate(['/modul-listesi']);
  }

  public async modulSil() {
    var result = await this.apiUtil.delete<any>(`/Modul/${this.id}`);
    if (result.success) this.router.navigate(['/modul-listesi']);
  }
}
