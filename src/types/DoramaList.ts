import { Dorama } from "./Dorama";

export class DoramaList {
  constructor(
    // id
    private _id: number,
    // カウント数
    private _count: number,
    // ドラマ一覧
    private _doramaList: Array<Dorama>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get count(): number {
    return this._count;
  }

  public set count(count: number) {
    this._count = count;
  }

  public get doramaList(): Array<Dorama> {
    return this._doramaList;
  }

  public set doramaList(doramaList: Array<Dorama>) {
    this._doramaList = doramaList;
  }
}
