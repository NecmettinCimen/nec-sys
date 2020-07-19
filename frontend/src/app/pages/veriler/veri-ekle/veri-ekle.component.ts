import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ApiUtilService } from 'src/app/services/api-util.service';
@Component({
  templateUrl: 'veri-ekle.component.html',
})
export class VeriEkleComponent {
  modul: any;
  veriadi: string;
  alanlar: Array<any> = [];
  id: string;
  silPopupShow: boolean = false;
  bosalanad: string = '';
  formstr: string = '{}';

  public silVisible() {
    return !isNullOrUndefined(this.id);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiUtil: ApiUtilService
  ) {}
  ngOnInit() {
    this.modul = this.route.snapshot.paramMap.get('modul');
    this.modulGetir();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.silVisible()) this.veriGetir();
  }

  private async modulGetir() {
    let result = await this.apiUtil.get<any>(`/Modul/${this.modul}`);
    this.veriadi = result.ad;
    this.alanlar = result.alanlar;
  }

  private async veriGetir() {
    let result = await this.apiUtil.get<any>(`/Veri/${this.modul}/${this.id}`);
    this.alanlar = this.alanlar.map((item) => {
      item.ilkdeger = result[item.ad];
      return item;
    });
  }

  public valueChanged(name: string, value: string) {
    let form = JSON.parse(this.formstr);
    form[name] = value;
    this.formstr = JSON.stringify(form);
  }
  public valueFromForm(name: string) {
    let form = JSON.parse(this.formstr);
    return form[name];
  }

  public async veriKaydet() {
    let form = JSON.parse(this.formstr);
    form.id = this.silVisible() ? this.id : Date.now();
    let formstr = JSON.stringify(form);

    var result = await this.apiUtil.post<any>('/Veri', {
      modul: this.veriadi,
      form: formstr,
      id: this.silVisible() ? this.id : null,
    });
    if (result.success)
      this.router.navigate(['/veri-listesi', { id: this.veriadi }]);
  }

  public async veriSil() {
    var result = await this.apiUtil.delete<any>(
      `/Veri/${this.modul}/${this.id}`
    );
    if (result.success) this.router.navigate(['/veri-listesi',{id:this.modul}]);
  }
}
