import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelDataServiceService } from '../excel-data-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  excelData?: any;
  uploaded: boolean = false;
  pageTitle: string = 'Send SMSs';
  constructor(private _router: Router, private _excelDataService: ExcelDataServiceService) {
  }
  ngOnInit(): void {
    this._excelDataService.$uploadStatus.subscribe((u) => this.uploaded = u.status);
    if(!this.uploaded) this._router.navigate(['tabs/tab1']);
  }

}
