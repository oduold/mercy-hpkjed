import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendSmsComponent } from './send-sms.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SmsTemplateComponent } from '../sms-template/sms-template.component';



@NgModule({
  declarations: [SendSmsComponent,SmsTemplateComponent],
  exports: [SendSmsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,]
})
export class SendSmsModule { }
