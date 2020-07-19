import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ApiUtilService } from 'src/app/services/api-util.service';
import { DxDataGridComponent } from 'devextreme-angular';
@Component({
  templateUrl: 'dosya-ekle.component.html',
})
export class DosyaEkleComponent {
  uyariPopupShow: boolean = false;

  fileToUpload: File = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiUtil: ApiUtilService
  ) {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  public async dosyaKaydet() {
    if (isNullOrUndefined(this.fileToUpload)) {
      this.uyariPopupShow = true;
      return;
    }
    var result = await this.apiUtil.postFile<any>('/Dosya', this.fileToUpload);
    if (result.success) this.router.navigate(['/dosya-listesi']);
  }
}
