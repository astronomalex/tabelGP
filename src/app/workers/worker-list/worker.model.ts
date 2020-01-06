export class WorkerModel {
  public name: string;
  public surname: string;
  public patronymic: string;
  public tabelNum: string;
  public grade: string;

  constructor(tabelNum: string, surname: string, name: string, patponymic: string, grade: string) {
    this.tabelNum = tabelNum;
    this.surname = surname;
    this.name = name;
    this.patronymic = patponymic;
    this.grade = grade;
  }
}
