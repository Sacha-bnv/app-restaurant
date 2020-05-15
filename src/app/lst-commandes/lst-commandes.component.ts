import { Component, OnInit } from '@angular/core';
import { CommandeInterface } from '../interfaces/commande';
import { CommandesService } from '../services/commandes.service';

@Component({
  selector: 'app-lst-commandes',
  templateUrl: './lst-commandes.component.html',
  styleUrls: ['./lst-commandes.component.scss']
})
export class LstCommandesComponent implements OnInit {
  step: number;
  init: boolean;
  isLoading: boolean;
  nbCommandes: number;
  commandes: Array<CommandeInterface>;
  commandesString;

  constructor(private commandeService: CommandesService) {
    this.step = 0;
    this.init = true;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCommandes();
  }

  getCommandes() {
    this.commandeService.getCommandes().then(res => { 
      this.commandesString = res.body;
      console.log(this.commandesString);
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
      this.isLoading = false;
      console.log(this.commandes);
    });    
  }

  isFirst(index: number): boolean {
    let ret = false;
    if (index === 0) {
      ret = true;
    }
    return ret;
  }

  isLast(index: number): boolean {
    let ret = false;
    if (index === this.nbCommandes - 1) {
      ret = true;
    }
    return ret;
  }

  setStep(index: number) {
    this.step = index;
    this.init = false;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
