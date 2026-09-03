export class Card {
  private _id: string;
  private _translationKey: string;

  constructor(id: string, translationKey: string) {
    this._id = id;
    this._translationKey = translationKey;
  }
}
