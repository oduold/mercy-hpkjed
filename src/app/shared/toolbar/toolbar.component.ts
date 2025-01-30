import { Component, Input } from '@angular/core';
import { ExcelDataServiceService } from 'src/app/excel-data-service.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  @Input() pageTitle!:string ;

  constructor(private _excelDataService: ExcelDataServiceService) { }

  refresh() {
    console.log('refresh');
    this._excelDataService.setSelectedExcelData([]);
    this._excelDataService.setUploadStatus({status:false});
  }

}
