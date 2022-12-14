export interface Dividende extends Object {
  _id: String;
  Symbol: String;
  Date_ExDiv: String;
  Date_Paiement: String;
  Dividende: Number;
  Status: 'New' | 'Update' | 'No Change';
}

export interface Buy extends Object {
  _id: String;
  Open: Boolean;
  Stock_Price: Number;
  Stock_Price_Date: String;
  Montant: Number;
  Symbol: String;
  Date_ExDiv: String;
  Date_Paiement: String;
  Dividende: Number;
  Status: 'New' | 'Update' | 'No Change';
}

export interface CreateBuy extends Object {
  IdStockDividende: String;
  Open: Boolean;
  Stock_Price: Number;
  Stock_Price_Date: String;
  Montant: Number;
}

export interface UpdateBuy extends Object {
  _id: String;
  Open: Boolean;
}
