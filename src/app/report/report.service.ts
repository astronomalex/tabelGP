import {Injectable} from '@angular/core';
import {Report} from './report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public calculateTime(dateReport: string, startDateString: string, endDateString: string) {
    if (dateReport && startDateString && endDateString) {
      const startDateStringMerged = this.megreDateTimeString(dateReport, startDateString);
      const endDateStringMerged = this.megreDateTimeString(dateReport, endDateString);
      // console.log('startDateString: ' + startDateString);
      // console.log('endDateString: ' + endDateString);
      return this.correctDate(endDateStringMerged) - this.correctDate(startDateStringMerged, true);
    } else {
      return 0;
    }
  }

  private megreDateTimeString(dateString, timeString) {
    return dateString + 'T' + timeString + ':00.000Z';
  }

  private correctDate(dateString, isStart: boolean = false) {
    let timeMins = 0  ;
    const borderMinute = (isStart) ? 29 : 30;
    const date = new Date(dateString);
    if (Number(dateString.substr(11, 2)) < 7) {
      timeMins = date.getTime() / 1000 / 60 + 1440;
    } else if ((Number(dateString.substr(11, 2)) === 7) && Number(dateString.substr(14, 2)) <= borderMinute) {
      timeMins = date.getTime() / 1000 / 60 + 1440;
    } else {
      timeMins = date.getTime() / 1000 / 60;
    }
    return timeMins;
  }
}
