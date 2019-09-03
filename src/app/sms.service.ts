import { SmsModel } from './sms.model';
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
    maxCount: 100,
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
