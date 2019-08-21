import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var SMS: any;

@Injectable({
  providedIn: 'root'
})
export class SmsService {

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

    const filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft'
      indexFrom: 0, // start from index 0
      maxCount: 10, // count of SMS to return each time
    };

    SMS.listSMS(filter, (list) => {
      console.log('SMS List', list);
    }, error => {
      console.log('error list sms: ' + error);
    });
  }
}
