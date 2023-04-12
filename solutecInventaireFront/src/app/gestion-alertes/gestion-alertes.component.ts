import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatFormFieldControl } from '@angular/material/form-field';




export interface ProductElement {
  Id: any;
  Alerte: string;
  Seuil: number;
  Active: boolean;
  Triggered: boolean;
  Email: boolean;
  description: String[];
  isEdit: boolean;
}
@Component({
  selector: 'app-gestion-alertes',
  templateUrl: './gestion-alertes.component.html',
  styleUrls: ['./gestion-alertes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [
    { provide: MatFormFieldControl, useExisting: GestionAlertesComponent }
  ]
})


export class GestionAlertesComponent implements OnInit {
  listAlert: any;
  dataSource: ProductElement[];
  columnsToDisplay = ['Alerte', "Seuil", 'Active', 'Triggered', 'Email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'isEdit', 'supprimer'];
  expandedElement: ProductElement | null;
  listDataSource: Array<any> = [];
  delete: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAlert();
  }

  addRow() {
    const newRow: ProductElement = {
      Id: null,
      Alerte: "",
      Seuil: 0,
      Active: false,
      Triggered: false,
      Email: false,
      isEdit: true,
      description: [""],
    };
    this.dataSource = [newRow, ...this.dataSource];
  }


  getAlert() {
    this.http.get('http://localhost:8301/getAlert').subscribe({
      next: (data) => {
        this.listAlert = data;
        this.listAlert.map((element: { idAlert: number; nameAlert: string; level: number; state: boolean; notifEmail: boolean; triggered: boolean; products: String[] }) => {
          let Tree = {} as ProductElement;
          Tree.Id = element.idAlert;
          Tree.Alerte = element.nameAlert;
          Tree.Seuil = element.level;
          Tree.Active = element.state;
          Tree.Email = element.notifEmail;
          Tree.Triggered = element.triggered;
          Tree.isEdit = false;
          Tree.description = element.products;
          this.listDataSource.push(Tree);
        })
        this.dataSource = this.listDataSource;
      },
      error: (err) => { console.log(err); }
    });
  }

  deleteAlerte(val: any) {
    this.http.delete('http://localhost:8301/deleteAlert/' + val).subscribe({
      next: (data) => {
        this.delete = data;
        this.ngOnInit();
      },
      error: (err) => { console.log(err); }

    })
  }


}



