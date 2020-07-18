import { Component, ViewChild } from '@angular/core';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiUtilService } from 'src/app/services/api-util.service';
import { isNullOrUndefined } from 'util';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  templateUrl: 'veri-listesi.component.html',
})
export class VeriListesiComponent {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;

  id: string;
  modul: string;
  dataSource: CustomStore;
  verilist: Array<any> = [];
  veridatatablegoster: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiUtil: ApiUtilService
  ) {
    this.dataSource = createStore({
      key: 'modul',
      loadUrl: `${apiUtil.baseUrl}/Modul`,
    });
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!isNullOrUndefined(this.id)) this.verigoster({ key: this.id });
  }
  public veriekle(e: any) {
    this.router.navigate(['/veri-ekle', { modul: e.key }]);
  }
  public async verigoster(e: any) {
    this.modul = e.key;
    let result = await this.apiUtil.get<any>(`/Veri/${this.modul}`);
    this.verilist = result.data;
    this.veridatatablegoster = true;
  }
  public async duzenle() {
    var selected = await this.dataGrid.instance.getSelectedRowKeys();
    this.router.navigate([
      'veri-duzenle',
      { modul: this.modul, id: selected[0].id },
    ]);
  }
}
