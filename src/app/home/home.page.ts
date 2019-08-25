import { SmsModel } from './../sms.service';
import { Component, ViewChild } from '@angular/core';
import { SmsService } from '../sms.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  public list: Array<SmsModel> = [];

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
    await this.smsService.getSMSfromPlugin();
    this.smsService.smsListChangeSubscription.subscribe(() => {
      this.list = [...this.smsService.smsList];
      console.log(`sms count: ${this.list.length}`);
    });
  }

  // private delay(countdownTime = 500): Promise<any> {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, countdownTime);
  //   });
  // }
}
