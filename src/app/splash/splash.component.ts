import { Component, OnInit } from '@angular/core';
import { WebAnalyticsService } from "../web-analytics/web-analytics.service";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(private analytics: WebAnalyticsService) {
  }

  ngOnInit() {
    this.analytics.sendBeacon({keya: 'val1', keyb: 'val2'});
    this.analytics.sendEvent('startedDownload,initiatedWorkflow', {items: 2, fileSize: 200000});
    this.analytics.sendAlias('reid@reidgivens.com');
    this.analytics.sendBeacon();
  }

}
