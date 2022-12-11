export interface Dividende extends Object {
  _id: String;
  Symbol: String;
  Secteur: String;
  Date_ExDiv: String;
  Date_Paiement: String;
  Div_Annuel: Number;
}

export interface Buy extends Object {
  _id: String;
  Symbol: String;
  Date_ExDiv: String;
  Date_Paiement: String;
  Div_Annuel: Number;
  Open: Boolean;
  Stock_Price: Number;
  Stock_Price_Date: String;
  Montant: Number;
}

export interface CreateBuy extends Object {
  Symbol: String;
  Date_ExDiv: String;
  Date_Paiement: String;
  Div_Annuel: Number;
  Open: Boolean;
  Stock_Price: Number;
  Stock_Price_Date: String;
  Montant: Number;
}
