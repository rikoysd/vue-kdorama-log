export class Dorama {
  constructor(
    // id
    private _id: number,
    // 画像
    private _image: string,
    // 名前
    private _name: string,
    // 公開年
    private _release: number,
    // あらすじ
    private _story: string
  ) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get image(): string {
    return this._image;
  }

  public set image(image: string) {
    this._image = image;
  }

  public get release(): number {
    return this._release;
  }

  public set release(release: number) {
    this._release = release;
  }

  public get story(): string {
    return this._story;
  }

  public set story(story: string) {
    this._story = story;
  }
}
