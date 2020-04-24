import {Injectable} from '@angular/core';
import {Report} from './report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public calculateTimeReport(report: Report) {
    let totalTime: number;
    for (const workUnit of report.workListReport) {
      totalTime += workUnit.getworkTime();
    }
    return totalTime;
  }
  public calculateTime(startDateString: string, endDateString: string) {
    console.log('startDateString: ' + startDateString);
    console.log('endDateString: ' + endDateString);
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    console.log('startDate: ' + startDate.getTime());
    console.log('endDate: ' + endDate.getTime());
    return ((endDate.getTime() - startDate.getTime()) / 1000) / 60;
  }
}
