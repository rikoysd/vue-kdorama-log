import { Log } from "./Log";
/**
 * 作品リストの部品クラスです.
 */
export class LogList {
  constructor(
    // id
    private _id: number,
    // 作品数
    private _count: number,
    // 作品リスト
    private _logLists: Array<Log>
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

  public get logLists(): Array<Log> {
    return this._logLists;
  }

  public set logList(logLists: Array<Log>) {
    this._logLists = logLists;
  }
}
