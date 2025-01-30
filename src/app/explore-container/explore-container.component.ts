import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ExcelDataServiceService, UploadStatus} from '../excel-data-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelData } from './excel-data';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit{

  @Input() name?: string;
  @Input() uploadForm!: FormGroup;
  uploadStatus!:UploadStatus;
  mandatoryHeaders: string [] = [
    'insured','mobile_no','policy_expiry_date','policy_number','premium','sum_insured','email_id'
  ];
  alertButtons = ['Ok'];

  constructor(
    private _router: Router,
    private _excelDataService: ExcelDataServiceService,
    private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.uploadForm = this.fb.group(
      {
        uploadFile:
        [
          '',
          {
            validators: [Validators.required],
            asyncValidators: []
          }
        ] });
    this.uploadStatus = this._excelDataService.getStatus();
    console.log(this.uploadStatus);
  }

  isError() {
    return this._excelDataService.getStatus().error ? 'ion-invalid' : '';
  }

  readFileAsync(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const fileReader : FileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            resolve(fileReader.result as string);
        });
        fileReader.addEventListener('error', (event) => {
            reject(event.target?.error);
        });
        fileReader.readAsArrayBuffer(file);
    });
}

  async upload(e: any) {
    console.log('upload ');

    const f= e.target.files[0];
    let message = 'Unable to read file';
    try {
      const arrayBuffer = await this.readFileAsync(f);
      const data : Uint8Array = new Uint8Array(arrayBuffer);
      const arr : Array<string> = new Array();
      for (let i = 0; i < data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      message = 'Invalid excel file uploaded';
      const bstr: string | ArrayBuffer | null = arr.join('');
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];
      // Convert the worksheet data to an object (you can customize this part)
      // get the excel header
      const headers: string[] = [];
      const colCount = XLSX.utils.decode_range(worksheet['!ref'] || '').e.c + 1;
      for (let i = 0; i < colCount; ++i) {
        headers[i] = worksheet[`${XLSX.utils.encode_col(i)}1`].v.trim().toLowerCase().replaceAll(' ','_'); // get values of 1 col
      }
      //validate headers
      const invalidFile: Boolean = this.mandatoryHeaders
      .filter((h:string) => !headers.includes(h)).length > 0;
      console.log(headers);
      console.log("invalid: " + invalidFile);
      if(invalidFile) {
        console.error(headers);
        throw new Error(message);
      }
      //xlsx to json
      const exdata = XLSX.utils.sheet_to_json(worksheet,{ raw: false, blankrows: false, header: headers });
      //signal magic
      exdata.forEach((d: any) => {
        if(d.policy_number != undefined && d.policy_number != 'POLICY NUMBER') {
          //update the signal
          this._excelDataService.updateExcelData(new ExcelData(d));
        }
      });
      // Display the data in the console
      message = "Successfully uploaded " + f.name;
      //update upload status
      this._excelDataService.setStatus({
        status: true,
        msg: message,
        error: false
      });
      //go to tab2
      this._router.navigate(['tabs/tab2'],{state: this._excelDataService.getStatus()});
    } catch (error) {
      this._excelDataService.setStatus({
        status: false,
        msg: message,
        error: true
      });
      console.error('upload status', this._excelDataService.getStatus());
    }
  }

  uploadStatusColor() {
    return this._excelDataService.getStatus().error ? "danger" : "success";
  }

  reset() {
    this._excelDataService.setExcelData([]);
    this._excelDataService.setStatus({status:false});
    console.log(this._excelDataService.getExcelData(),this._excelDataService.getStatus());
  }

}



export interface UploadForm extends FormGroup{
  uploadFile: AbstractControl<any>;
}
