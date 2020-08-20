export class TimeWorkInfo {
  index: number;
  typeWork: string;
  amountMinutes: number;

  constructor(index, typeWork, amountMinutes) {
    this.index = index;
    this.typeWork = typeWork;
    this.amountMinutes = amountMinutes;
  }
}
