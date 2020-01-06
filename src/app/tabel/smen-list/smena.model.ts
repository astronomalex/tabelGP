import {WorkersTime} from './workers-time.model';

export class Smena {
  constructor(
    public dateSmen: string,
    public mashine: string,
    public numSmen: string,
    public workersTime: WorkersTime[])
  {}
}
