import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CICExcelObject } from './explore-container/excel-data';
import { UploadStatus } from './explore-container/upload-status-data';

@Injectable({
  providedIn: 'root'
})
export class ExcelDataServiceService {
  private selectedExcelDataSubject = new BehaviorSubject<Array<CICExcelObject>>([]);
  private excelData = signal(new Array<CICExcelObject>());
  private uploadStatus = signal({status: false, msg: '', error: false});
  private uploadStatusSubject = new BehaviorSubject<UploadStatus>({status: false, msg: '', error: false});
  $selectedExcelData = this.selectedExcelDataSubject.asObservable();
  $uploadStatus = this.uploadStatusSubject.asObservable();
  constructor() { }

  setStatus(status: any) {
    this.uploadStatus.set(status);
  }

  getExcelData():  Array<CICExcelObject>{
    return this.excelData();
  }

  getStatus(){
    return this.uploadStatus();
  }

  updateExcelData(obj: CICExcelObject) {
    this.excelData().push(obj);
  }

  setExcelData(arr: Array<CICExcelObject>) {
    this.excelData.set(arr);
  }

  setSelectedExcelData(excelData: Array<CICExcelObject>) {
    this.selectedExcelDataSubject.next(excelData);
  }

  setUploadStatus(uploadStatusData: UploadStatus) {
    this.uploadStatusSubject.next(uploadStatusData);
  }
}
export { CICExcelObject, UploadStatus };

