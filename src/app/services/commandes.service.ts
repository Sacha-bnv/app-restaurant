import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CommandeInterface } from '../interfaces/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  //data
  private commandesSource;
  //observable
  commandesObs;

  
  private commandes: Array<CommandeInterface>;
  private commandesString;
  private nbCommandes: number

  constructor(private http: HttpClient) {
    this.commandesSource = new BehaviorSubject(new Array());
    this.commandesObs = this.commandesSource.asObservable();
   }

  getCommandes(ets: number) {
    this.http.get('http://localhost/wsrestaurant/serveur/index.php?ets=' + ets, {
        observe: 'response',
    }).toPromise().then(res => { 
      this.commandesString = res.body;
      this.nbCommandes = this.commandesString.length;
      if (this.nbCommandes !== 0) {
        this.commandes = new Array(this.nbCommandes);
        for (let i = 0; i < this.nbCommandes; i ++) {
          this.commandes[i] = {
            id: this.commandesString[i].id, date: this.commandesString[i].date, 
            prix: this.commandesString[i].prix, idClient: '', prenomClient: 'prenomTest', nomClient: 'nomTest', plats: null
          }
        }
      }
      this.commandesSource.next(this.commandes);
    });    
  }
}
