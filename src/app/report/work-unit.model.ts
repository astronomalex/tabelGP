export class WorkUnit {
  public startWorkTime: string;
  public endWorkTime: string;
  public typeWork: string;
  public numOrder: string;
  public nameOrder: string;
  public groupDifficulty: string;
  public amountDonePieces: number;


  constructor(typeWork?, numOrder?, nameOrder?, groupDifficulty?, startWorkTime?, endWorkTime?, amountDonePieces?) {
    this.amountDonePieces = amountDonePieces;
    this.endWorkTime = endWorkTime;
    this.startWorkTime = startWorkTime;
    this.groupDifficulty = groupDifficulty;
    this.nameOrder = nameOrder;
    this.numOrder = numOrder;
    this.typeWork = typeWork;
  }
}
