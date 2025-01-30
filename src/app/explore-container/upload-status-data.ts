export class UploadStatusData {
  status: boolean;
  msg?: string;
  error?: boolean;

  constructor(d: any) {
    this.status = d.status;
    this.msg = d.msg;
    this.error = d.error;
  }
}
export interface UploadStatus {
  status: boolean,
  msg?: string,
  error?: boolean
}
