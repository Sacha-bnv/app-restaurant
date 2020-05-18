import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { NotificationsComponent } from './notifications/notifications.component'
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //data
  hide = true;

  //root
  homeRoot = false;
  signUpRoot = false;
  loginRoot = false;
  lstCommandesRoot = false;

  //CSS
  margin = '';

  private currentUserSubject;
  private currentUser;

  ngOnInit() {}

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, 
    private _bottomSheet: MatBottomSheet, private cnx: ConnexionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.goToHome();
  }

  getStatus(): boolean {
    return this.cnx.Status;
  }

  getRole(): string {
    let ret: string;
    if(this.getStatus()) {
      ret = this.cnx.Role;
    } else {
      ret = 'visiteur';
    }
    return ret;
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

  goToHome(): void {
    this.setAllRootFalse();
    this.margin = '0px';
    this.homeRoot = true;
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
