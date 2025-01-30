export class ExcelData {
  insured?: string;
  mobile_no?: string;
  policy_expiry_date?: string;
  policy_number?: string;
  premium?: string;
  sum_insured?: string;
  email_id?: string;
  registration?: string;

  constructor(d: any) {
    this.insured = d.insured;
    this.email_id = d.email_id;
    this.mobile_no  = d.mobile_no;
    this.policy_expiry_date = d.policy_expiry_date;
    this.policy_number = d.policy_number;
    this.premium = d.premium;
    this.sum_insured = d.sum_insured;
    this.registration = d.registration;
  }
}

export interface CICExcelObject {
  insured?: string;
  mobile_no?: string;
  policy_expiry_date?: string;
  policy_number?: string;
  premium?: string;
  sum_insured?: string;
  email_id?: string;
  registration?: string;
}
