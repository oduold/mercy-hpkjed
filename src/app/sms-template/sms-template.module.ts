import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SmsTemplateComponent } from './sms-template.component';

@NgModule({
  declarations: [],
  exports : [
    SmsTemplateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsTemplateModule,
  ],
})
export class SmsTemplateModule { }
