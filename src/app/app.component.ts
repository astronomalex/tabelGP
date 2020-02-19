import {Component, OnInit} from '@angular/core';
import {DataStorageService} from './shared/data-storage.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-tabel-app';
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
