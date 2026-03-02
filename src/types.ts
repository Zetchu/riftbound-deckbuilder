export interface Card {
  id: string;
  name: string;
  cost: number;
  type: string;
}

export interface DeckItem extends Card {
  count: number;
}
