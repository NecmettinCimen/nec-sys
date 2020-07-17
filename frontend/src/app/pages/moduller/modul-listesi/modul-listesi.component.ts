import { Component } from '@angular/core';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'modul-listesi.component.html',
})
export class ModulListesiComponent {
  dataSource: CustomStore;

  constructor(private router: Router) {
    this.dataSource = createStore({
      key: 'modul',
      loadUrl: 'https://localhost:5001/Modul',
    });
  }
  public duzenle(e) {
    console.log(e);
    console.log({ id: e.key })
    this.router.navigate(['/modul-duzenle', { id: e.key }]);
  }
}
