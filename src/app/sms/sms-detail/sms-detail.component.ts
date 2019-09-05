import { SmsModel } from './../../sms.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sms-detail',
  templateUrl: './sms-detail.component.html',
  styleUrls: ['./sms-detail.component.scss'],
})
export class SmsDetailComponent implements OnInit {

  public sms: SmsModel = {} as SmsModel;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sms = Object.assign(this.sms, JSON.parse(params.sms));
    });
  }

}
