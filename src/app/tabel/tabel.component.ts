import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css']
})
export class TabelComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {}
}
