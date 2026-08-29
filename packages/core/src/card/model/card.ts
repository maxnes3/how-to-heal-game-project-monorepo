export class Card {
  private _id: string;
  private name: string;
  private description: string;

  constructor(_id: string, name: string, description: string) {
    this._id = _id;
    this.name = name;
    this.description = description;
  }
}
