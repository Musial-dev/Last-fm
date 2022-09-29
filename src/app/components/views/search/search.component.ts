import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { LastFmService } from 'src/app/services/lastfm.service';
import { FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RefreshService } from 'src/app/services/refresh.service';

export interface SearchModel {
  searchText: String;
  searchType: String;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchText!: string;
  searchType!: string;
  albumView!: boolean;

  optionsControl = new FormControl<string | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  itens: any[] = [];

  constructor(
    private lastFmService: LastFmService,
    private storageService: LocalStorageService,
    private refreshService: RefreshService

  ) {}

  ngOnInit(): void {}
  
  search() {
    let date = new Date();
    this.storageService.set(
      date.toLocaleDateString() + '-' + date.toLocaleTimeString(),
      this.searchType + '?' + this.searchText
    );

    this.refreshService.setRefresh(true);

    if (this.searchType == 'album') {
      this.albumView = true;
      this.lastFmService.searchByAlbum(this.searchText).subscribe(
        (response) => {
          this.itens = response.results.albummatches.album;
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.searchType == 'artist') {
      this.albumView = false;
      this.lastFmService.searchByArtist(this.searchText).subscribe(
        (response) => {
          this.itens = response.results.artistmatches.artist;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  clear() {
    this.itens = [];
  }
}
