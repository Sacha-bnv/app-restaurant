import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connexion.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // snackbar
  actionButtonLabel = 'Fermer';
  autoHide = 3000;

  //data
  hide = true;
  isLoading: boolean;
  error: string;
  email: string;
  password: string;

  ngOnInit() {}

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private http: HttpClient, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
    private router: Router, private cnx: ConnexionService, public snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isLoading = false;
    this.error = '';
    this.resetLog();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  resetLog(): void {
    this.email = '';
    this.password = '';
  }

  connexion(login: string, password: string) {
    this.isLoading = true;
    this.cnx.connectUser(login, password)
      .pipe()
      .subscribe(
        data => {
          this.isLoading = false;
          if (this.cnx.Status) {
            this.error = '';
            this.snackBar.open('Connexion effectuée !', this.actionButtonLabel, {duration: 3000});
          } else {
            this.error = 'Email ou mot de passe invalide';
          }
        },
        error => {
          this.error = 'Email ou mot de passe invalide';
          this.isLoading = false;
      });
  }

  onKeyLogin(event: KeyboardEvent): void {
    this.email = (event.target as HTMLInputElement).value;
  }

  onKeyPassword(event: any): void {
    this.password = event.target.value;
  }

  login(): void {
    this.connexion(this.email, this.password);
  }
  
}
