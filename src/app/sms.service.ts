import { Injectable, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var SMS: any;

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  private step = 20;

  // tslint:disable-next-line: variable-name
  private _filter = {
    box: 'inbox',
    indexFrom: 0,
    maxCount: 1000,
  };

  // tslint:disable-next-line: variable-name
  private _smsList: Array<SmsModel> = [];
  public get smsList(): Array<SmsModel> {
    return this._smsList;
  }
  public set smsList(value: Array<SmsModel>) {
    this._smsList = value;
  }

  public smsListChangeSubscription = new EventEmitter();

  constructor(
    private platform: Platform,
    private androidPermissions: AndroidPermissions
  ) { }

  checkSMSPermission() {
    if (!(window as any).cordova) {
      return Promise.resolve();
    }

    return this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS);
  }

  requestSMSPermission() {
    if (!(window as any).cordova) {
      return Promise.resolve();
    }

    return this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  async getSMSfromPlugin() {
    if (!(window as any).cordova) {
      return Promise.resolve();
    }

    if (!SMS) {
      return Promise.resolve();
    }

    await this.platform.ready();

    SMS.listSMS(this._filter,
      this.onSuccess.bind(this),
      this.onError.bind(this)
    );
  }

  private onSuccess(list: Array<SmsModel>) {
    this._smsList = [...list];
    this.smsListChangeSubscription.emit();
  }

  private onError(error) {
    console.log('error list sms: ' + error);
  }
}

export interface SmsModel {
  address: string;
  announcements_subtype: number;
  app_id: number;
  body: string;
  creator: string;
  d_rpt_cnt: number;
  date: number;
  date_sent: number;
  deletable: number;
  error_code: number;
  favorite: number;
  hidden: number;
  locked: number;
  msg_id: number;
  pri: number;
  protocol: number;
  read: number;
  reply_path_present: number;
  reserved: number;
  roam_pending: number;
  safe_message: number;
  secret_mode: number;
  seen: number;
  service_center: string;
  sim_imsi: string;
  sim_slot: number;
  spam_report: number;
  status: number;
  sub_id: number;
  svc_cmd: number;
  teleservice_id: number;
  thread_id: number;
  type: number;
  using_mode: number;
  _id: number;
}

// address: "Vietcombank"
// announcements_subtype: 0
// app_id: 0
// body: "SD TK 0501000127289 +500,000VND luc 23-08-2019 12:13:42. SD 613,115VND. Ref Sender:01604003.DD:230819.SHGD:10001662.BO:NGUYEN TAN HUNG.MOMO CHARGEDETAILS OUR"
// creator: "com.samsung.android.messaging"
// d_rpt_cnt: 0
// date: 1566537232614
// date_sent: 1566537230000
// deletable: 0
// error_code: -1
// favorite: 0
// hidden: 0
// locked: 0
// msg_id: 0
// pri: 0
// protocol: 0
// read: 0
// reply_path_present: 0
// reserved: 0
// roam_pending: 0
// safe_message: 0
// secret_mode: 0
// seen: 0
// service_center: "+84900000042"
// sim_imsi: "452019162323921"
// sim_slot: 1
// spam_report: 0
// status: -1
// sub_id: -1
// svc_cmd: 0
// teleservice_id: 0
// thread_id: 12
// type: 1
// using_mode: 0
// _id: 1208