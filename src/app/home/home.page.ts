import { Component } from '@angular/core';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private smsService: SmsService
  ) { }

  ionViewWillEnter() {
    this.checkSMSPermission();
  }

  private async populateSMSList(permissionGranted = false) {
    if (!permissionGranted) {
      await this.smsService.requestSMSPermission();
    }
    await this.getSMSfromPlugin();
  }

  private checkSMSPermission() {
    this.smsService.checkSMSPermission().then(
      async success => {
        const permissionGranted: boolean = success.hasPermission;
        await this.populateSMSList(permissionGranted);
      },
      async err => await this.populateSMSList()
    );
  }

  async getSMSfromPlugin() {
    this.smsService.getSMSfromPlugin();
  }
}

