import { Component, ViewChild } from '@angular/core';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import CustomStore from 'devextreme/data/custom_store';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiUtilService } from 'src/app/services/api-util.service';
import { isNullOrUndefined } from 'util';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  templateUrl: 'dosya-listesi.component.html',
})
export class DosyaListesiComponent {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;

  dosyaList: Array<any> = [];
  silPopupShow: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiUtil: ApiUtilService
  ) {
    this.dosyaGetir();
  }

  public async dosyaGetir() {
    this.dosyaList = await this.apiUtil.get<any>(`/Dosya`);
  }

  public async dosyaIndir() {
    var selected = await this.dataGrid.instance.getSelectedRowKeys();
    selected.forEach((element: { FileName: string }) => {
      window.open(
        `${this.apiUtil.baseUrl}/Dosya/${element.FileName}`,
        '_blank'
      );
    });
  }

  public async dosyaSil() {
    var selected = await this.dataGrid.instance.getSelectedRowKeys();
    var result = await this.apiUtil.delete<any>(
      `/Dosya/${selected[0].fileName}`
    );
    if (result.success) this.dosyaGetir();
  }
}
