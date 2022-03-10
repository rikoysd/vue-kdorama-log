/**
 * 記録の部品クラスです.
 */
export class Log {
  constructor(
    // id
    private _id: number,
    // タイトル
    private _title: string,
    // 感想
    private _text: string,
    // 鑑賞日
    private _watchDate: Date
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get text(): string {
    return this._text;
  }

  public set text(text: string) {
    this._text = text;
  }

  public get watchDate(): Date {
    return this._watchDate;
  }

  public set watchDate(watchDate: Date) {
    this._watchDate = watchDate;
  }
}
