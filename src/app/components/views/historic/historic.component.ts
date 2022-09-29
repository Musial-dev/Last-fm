import { Component, OnInit, OnChanges } from '@angular/core';
import { fadeInItems } from '@angular/material/menu';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RefreshService } from 'src/app/services/refresh.service';

export interface HISTORIC {
  searchText: string;
  searchType: string;
}

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent implements OnInit {
  itens: any = [];

  constructor(
    private storageService: LocalStorageService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    this.getItens();
    this.refreshService.getRefresh().subscribe((value: boolean) => {
      if (value) {
        this.getItens();
      }
    });
  }

  countChange(event: any) {
    this.getItens();
  }

  getItens() {
    var list = this.storageService.getAll();

    var result = list.filter((xpto: { searchText: any; searchType: any; }, index: any, array: any[]) => array.findIndex(t => t.searchText == xpto.searchText && t.searchType == xpto.searchType) == index);
    console.log(result);
    console.log(list);
    this.itens = result;
  }

  clear() {
    this.storageService.clear();
    this.refreshService.setRefresh(true);
  }
}
