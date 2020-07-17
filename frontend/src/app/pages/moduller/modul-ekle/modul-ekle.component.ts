import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Modul } from '../../../models/Modul';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
@Component({
  templateUrl: 'modul-ekle.component.html',
})
export class ModulEkleComponent {
  modul: any;
  alanlar: Array<any>;
  colCountByScreen: object;
  id: string;

  public silVisible() {
    return !isNullOrUndefined(this.id);
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.modul = {
      ad: '',
      aciklama: '',
      aktif: true,
    };
    this.alanlar = [];
    this.id = null;
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    };
  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNullOrUndefined(id)) this.modulGetir(id);
  }

  private async modulGetir(id: string) {
    this.id = id;

    var result = await this.http
      .get<any>(`https://localhost:5001/Modul/${id}`)
      .toPromise();
    console.log(result);
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
  public alanKaldir(item) {
    this.alanlar = this.alanlar.filter((f) => f.id != item.id);
  }
  public async modulKaydet() {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    let values = JSON.stringify({
      ad: this.modul.ad,
      eskiad: this.id,
      aciklama: this.modul.aciklama,
      aktif: this.modul.aktif,
      alanlar: this.alanlar,
    });
    let modul = new Modul(values);
    const body = JSON.stringify(modul);

    var result = await this.http
      .post<any>('https://localhost:5001/Modul', body, { headers: header })
      .toPromise();
    if (result.success) this.router.navigate(['/modul-listesi']);
  }

  public async modulSil() {
    var result = await this.http
      .delete<any>(`https://localhost:5001/Modul/${this.id}`)
      .toPromise();
    if (result.success) this.router.navigate(['/modul-listesi']);
  }
}
