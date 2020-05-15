import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { NotificationsComponent } from './notifications/notifications.component'
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hide = true;
  signUpRoot = false;
  loginRoot = false;
  lstCommandesRoot = false;

  //CSS
  margin = '';

  ngOnInit() {}

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private _bottomSheet: MatBottomSheet) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(NotificationsComponent);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /* Routing */  
  setAllRootFalse(): void {
    this.signUpRoot = false;
    this.loginRoot = false;
    this.lstCommandesRoot = false;
  }

  goToLogin(): void {
    this.setAllRootFalse();
    this.margin = '130px';
    this.loginRoot = true;
  }

  goToSignUp(): void {
    this.setAllRootFalse();
    this.margin = '130px';
    this.signUpRoot = true;
  }

  goToCommandes(): void {
    this.setAllRootFalse();
    this.margin = '0px';
    this.lstCommandesRoot = true;
  }

}
