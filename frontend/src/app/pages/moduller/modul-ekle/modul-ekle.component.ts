import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Modul } from '../../../models/Modul'
@Component({
  templateUrl: 'modul-ekle.component.html'
})

export class ModulEkleComponent {
  modul: any;
  alanlar: Array<any>;
  colCountByScreen: object;

  constructor(private http: HttpClient) {
    this.modul = {
      ad: '',
      aciklama: '',
      aktif: true
    };
    this.alanlar = [];
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }

  public alanEkle() {
    let id = this.alanlar.length + 1;
    this.alanlar.push({ id: id, ad: '', tip: '', ilkdeger: '' })
  }
  public alanKaldir(item) {
    this.alanlar = this.alanlar.filter(f => f.id != item.id);
  }
  public async modulKaydet() {
    const header = new HttpHeaders()
      .set('Content-type', 'application/json');

    let values = JSON.stringify({
      ad: this.modul.ad,
      aciklama: this.modul.aciklama,
      aktif: this.modul.aktif,
      alanlar: this.alanlar
    });
    console.log(values)
    let body = new Modul(values);
    console.log(body)
    const body2 = JSON.stringify(body);

    var result = await this.http.post('https://localhost:5001/Modul', body2, { headers: header }).toPromise();
    console.log(result);
  }
}
