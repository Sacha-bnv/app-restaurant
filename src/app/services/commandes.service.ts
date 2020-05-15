import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  constructor(private http: HttpClient) { }

  getCommandes() {
    return this.http.get('http://localhost/wsrestaurant/serveur/index.php?ets=1', {
        observe: 'response',
    }).toPromise();
  }
}
