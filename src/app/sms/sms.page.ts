import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { SmsModel } from '../sms.model';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  public list: Array<SmsModel> = [];

  constructor(
    private smsService: SmsService
  ) { }

  ionViewWillEnter() {
    if ((window as any).cordova) {
      this.checkSMSPermission();
    } else {
      this.list.push({
        address: 'Vietcombank',
        announcements_subtype: 0,
        app_id: 0,
        // tslint:disable-next-line: max-line-length
        body: 'SD TK 0501000127289 +500,000VND luc 23-08-2019 12:13:42. SD 613,115VND. Ref Sender:01604003.DD:230819.SHGD:10001662.BO:NGUYEN TAN HUNG.MOMO CHARGEDETAILS OUR',
        creator: 'com.samsung.android.messaging',
        d_rpt_cnt: 0,
        date: 1566537232614,
        date_sent: 1566537230000,
        deletable: 0,
        error_code: -1,
        favorite: 0,
        hidden: 0,
        locked: 0,
        msg_id: 0,
        pri: 0,
        protocol: 0,
        read: 0,
        reply_path_present: 0,
        reserved: 0,
        roam_pending: 0,
        safe_message: 0,
        secret_mode: 0,
        seen: 0,
        service_center: '+84900000042',
        sim_imsi: '452019162323921',
        sim_slot: 1,
        spam_report: 0,
        status: -1,
        sub_id: -1,
        svc_cmd: 0,
        teleservice_id: 0,
        thread_id: 12,
        type: 1,
        using_mode: 0,
        _id: 1208
      } as SmsModel);
    }
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
    });
  }

  // private delay(countdownTime = 500): Promise<any> {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, countdownTime);
  //   });
  // }

}
