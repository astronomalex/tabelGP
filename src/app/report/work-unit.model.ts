export class WorkUnit {
  private workTime: number;
  public startWorkTime: Date;
  public endWorkTime: Date;
  public typeWork: string;
  public numOrder: string;
  public nameOrder: string;
  public groupDifficulty: string;
  public amountDonePieces: number;

  public get getWorkTime() {
    return this.workTime;
  }

  constructor(typeWork?, numOrder?, nameOrder?, groupDifficulty?, startWorkTime?, endWorkTime?, amountDonePieces?) {
    console.log(this.startWorkTime, this.endWorkTime);

    if (this.startWorkTime && this.endWorkTime) {
      this.workTime = (this.endWorkTime.getTime() - this.startWorkTime.getTime()) * 3600000;
    } else {
      this.workTime = 0;
    }
  }

  public getworkTime() {
    return this.workTime;
  }
}
