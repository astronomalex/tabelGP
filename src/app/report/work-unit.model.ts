export class WorkUnit {
  private workTime: number;
  public startWorkTime: Date;
  public endWorkTime: Date;
  public typeWork: string;
  public numOrder: string;
  public nameOrder: string;
  public groupDifficulty: string;

  public get getWorkTime() {
    return this.workTime;
  }

  constructor(typeWork?, numOrder?, nameOrder?, groupDifficulty?, startWorkTime?, endWorkTime?) {
    console.log(this.startWorkTime, this.endWorkTime);
    this.workTime = (this.endWorkTime.getTime() - this.startWorkTime.getTime()) * 3600000;
  }

  public getworkTime() {
    return this.workTime;
  }
}
