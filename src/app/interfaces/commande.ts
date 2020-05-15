export interface CommandeInterface {
    id: string;
    date: string;
    idClient: string;
    prenomClient: string;
    nomClient: string;
    plats: Array<any>;
    prix: number;
}