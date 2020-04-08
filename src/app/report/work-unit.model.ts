export class WorkUnit {
  private workTime: number;
  public startWorkTime: Date;
  public endWorkTime: Date;
  public typeWork: string;
  public numZakaza: string;
  public nameZakaza: string;
  public groupDifficulty: number;

  public get getWorkTime() {
    return this.workTime;
  }

  constructor(typeWork, numZakaza, nameZakaza, groupDifficulty, startWorkTime, endWorkTime) {
    this.workTime = (this.endWorkTime.getTime() - this.startWorkTime.getTime()) * 3600000;
  }
}
