import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonneInterface } from '../interfaces/personne';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private connected: boolean;
  private user: PersonneInterface;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PersonneInterface>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return localStorage.getItem('currentUser');
  }

  public get Status(): boolean {
    return this.connected;
  }

  public get User(): PersonneInterface {
    return this.user;
  }

  public get Role(): string {
    return this.user.role;
  }

  connectUser(login: string, password: string) {
    
    return this.http.get<any>('http://localhost//wsrestaurant/serveur/index.php?login=' + login + '&password=' + password)
      .pipe((user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          user.subscribe(
            data => {
            if (data.length === 0) {

            } else {
              const u = data[0];
              this.user = {
                nom: u.nom, prenom: u.prenom, dateNaissance: u.dateNaissance,
                numeroRue: u.numeroRue, nomRue: u.nomRue, CP: u.CP, ville: u.ville, role: u.role
              };
              this.connected = true;
            }
          },
          error => {
            localStorage.setItem('currentUser', 'error');
          });
          this.currentUserSubject.next(user);
          return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}


}
