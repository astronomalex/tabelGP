import {Component, OnDestroy, OnInit} from '@angular/core';
import {Smena} from './smena.model';
import {SmenListService} from './smen-list.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-smen-list',
  templateUrl: './smen-list.component.html',
  styleUrls: ['./smen-list.component.css']
})
export class SmenListComponent implements OnInit, OnDestroy {
  smens: Smena[];
  subscription: Subscription;

  constructor(
    private slService: SmenListService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.slService.smensCahnged.subscribe(
      (smens: Smena[]) => {
        this.smens = smens;
      }
    );
    this.smens = this.slService.getSmens();
  }

  onNewSmena() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
