import { Component, Input, OnInit } from '@angular/core';
import { ExcelDataServiceService, UploadStatus } from '../excel-data-service.service';


@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss'],
})
export class SendSmsComponent implements OnInit{
  data?: any;
  uploadStatus?: UploadStatus;
  @Input() uploaded: boolean = false;
  sent: Array<number> = [];
  failed: Array<number> = [];

  constructor(private _excelDataService: ExcelDataServiceService ) {}

  ngOnInit(): void {
    this.data = this._excelDataService.getExcelData();
    this.uploadStatus = this._excelDataService.getStatus();
    if(this.uploadStatus?.error) {
      this._excelDataService.setExcelData([]);
    }
  }
}
