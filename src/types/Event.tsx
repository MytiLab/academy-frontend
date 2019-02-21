//modello per la gestione degli eventi della unit

export class Event{
     id :number;
     idDevice :number;
     type :string ;
     value :string ;
     timestamp :Date;
     important:number;
}