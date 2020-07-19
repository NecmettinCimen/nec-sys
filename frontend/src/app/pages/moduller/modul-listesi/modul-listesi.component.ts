import { Component } from '@angular/core';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import { Router } from '@angular/router';
import { ApiUtilService } from 'src/app/services/api-util.service';

@Component({
  templateUrl: 'modul-listesi.component.html',
})
export class ModulListesiComponent {
  dataSource: CustomStore;

  constructor(private router: Router, private apiUtil: ApiUtilService) {
    this.dataSource = createStore({
      key: 'modul',
      loadUrl: `${apiUtil.baseUrl}/Modul`,
    });
  }
  public duzenle(e: any) {
    this.router.navigate(['/modul-duzenle', { id: e.key }]);
  }
  public veriEkle(e: any) {
    this.router.navigate(['/veri-ekle', { modul: e.key }]);
  }
}
