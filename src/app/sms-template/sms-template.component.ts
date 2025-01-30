import { TitleCasePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SmsManager } from '@byteowls/capacitor-sms';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.scss'],
  providers: [TitleCasePipe]
})
export class SmsTemplateComponent implements OnInit{
  @Input() row?: any
  @Input() index: number = -1;
  @Input() sent: Array<number> = [];
  @Output() sentChange: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  @Input() failed: Array<number> = [];
  @Output() failedChange: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  agentNumber: string = '#########';
  paybill: string = '########';
  info: any;

  @ViewChild('#sms-message') smsMsgElem?: ElementRef;


  constructor(private _elRef: ElementRef) { }

  ngOnInit(): void {
    this.info = App.getInfo();
    App.addListener('appStateChange',() => {
      console.log('state changed');
    });
    App.addListener('resume',() => {
      console.log('resume');
    });
  }

  sendSms(mobile_no: any) {
    console.log('sending sms to: ',mobile_no);
    try {
      const smsMsg =  this._elRef.nativeElement.querySelector('#sms-message') as HTMLDivElement;
      const sms = smsMsg.innerHTML.replace(/<[^>]*>/g, '');
      const numbers: string[] = [mobile_no];
      SmsManager.send({
        numbers: numbers,
        text: sms,
      }).then( () => {
        console.log("Sent successfully");
        this.sent.push(this.index);
        this.sentChange.emit(this.sent);
        console.log('sent',this.sent);
      }
          //success
      ).catch(error => {
        console.error(error);
        this.failed.push(this.index);
        this.failedChange.emit(this.failed);
        console.log('failed',this.failed);
      });
    } catch (error) {
      console.error('Failed to send SMS', error);
      this.failed.push(this.index);
      this.failedChange.emit(this.failed);
      console.log('failed',this.failed);
    }
  }

  hideRow(row: any) {
    return  this.sent.filter((num: number) => this.index == num).length > 0
    || this.failed.filter((num: number) => this.index == num).length > 1;
  }

}
