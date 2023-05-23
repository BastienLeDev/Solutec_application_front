import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Historic {
  //Propriétées pour le tableau
  idHistoric: number;
  user: string;
  dateHistoric: Date;
  typeModif: string;
  typeProduct: string;
  // Produit avant modification
  refProductB: string;
  ownerB: string;
  entryDateB: Date;
  exitDateB: Date;
  reservationB: boolean;
  // Produit après modification
  refProductA: string;
  ownerA: string;
  entryDateA: Date;
  exitDateA: Date;
  reservationA: boolean;
}

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  listHistoric: any;
  listDataSource: Historic[] = [];

  displayedColumns: string[] = ['dateHistoric', 'typeModif', 'typeProduct', 'refProductB', 'ownerB', 'entryDateB', 'exitDateB', 'reservationB', 'refProductA', 'ownerA', 'entryDateA', 'exitDateA', 'reservationA'];
  dataSource = new MatTableDataSource<Historic>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getHistoric();
  }

  getHistoric() {
    this.http.get('http://localhost:8301/historic').subscribe({
      next: (data) => {
        this.listHistoric = data
        this.createDataSource(this.listHistoric)
        console.log(this.dataSource)
      },

      error: (err) => { console.log(err) }
    })

  }

  createDataSource(listhistoric: any) {
    for (let i in listhistoric) {
      let historic = {} as Historic;
      historic.typeModif = listhistoric[i].typeModif;
      historic.user = listhistoric[i].user;
      historic.typeProduct = listhistoric[i].typeProduct;
      historic.dateHistoric = listhistoric[i].dateHistoric;
      historic.entryDateA = listhistoric[i].entryDateA;
      historic.entryDateB = listhistoric[i].entryDateB;
      historic.exitDateA = listhistoric[i].exitDateA;
      historic.exitDateB = listhistoric[i].exitDateB;
      historic.idHistoric = listhistoric[i].idHistoric;
      historic.ownerA = listhistoric[i].ownerA;
      historic.ownerB = listhistoric[i].ownerB;
      historic.refProductA = listhistoric[i].refProductA;
      historic.refProductB = listhistoric[i].refProductB;
      historic.reservationA = listhistoric[i].reservationA;
      historic.refProductB = listhistoric[i].reservationB;
      this.listDataSource.push(historic);
    }
    this.dataSource = new MatTableDataSource<Historic>(this.listDataSource);
    this.dataSource.sort = this.sort;
  }

}
