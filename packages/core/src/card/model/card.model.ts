export class CardModel {
  private _id: string;
  private _translationKey?: string;
  private _spriteKey?: string;

  constructor(id: string, translationKey?: string, spriteKey?: string) {
    this._id = id;
    this._translationKey = translationKey;
    this._spriteKey = spriteKey;
  }

  public getId(): string {
    return this._id;
  }

  public getTranslationKey(): string | undefined {
    return this._translationKey;
  }

  public getSpriteKey(): string | undefined {
    return this._spriteKey;
  }
}
