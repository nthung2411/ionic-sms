import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';

declare var SMSPlugin: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private androidPermissions: AndroidPermissions,
    private platform: Platform
  ) { }

  ionViewWillEnter() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  getSMSfromPlugin() {

    this.platform.ready().then((readySource) => {

      const filter = {
        box: 'inbox', // 'inbox' (default), 'sent', 'draft'
        indexFrom: 0, // start from index 0
        maxCount: 10, // count of SMS to return each time
      };

      if (SMSPlugin) {
        SMSPlugin.listSMS(filter, (list) => {
          console.log('SMS List', list);
        }, error => {
          console.log('error list sms: ' + error);
        });
      }
    });
  }
}

