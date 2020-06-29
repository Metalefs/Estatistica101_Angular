import { Component, ViewChild, OnInit } from '@angular/core';
import { RestApiService } from '../../api/RestApiService';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from 'src/app/shared/dialog/dialog.component';

export interface TabelaDadosAgrupados {
  intervalos:number[];
  xi:number[];
  fi:number[];
  Fi:number[];
  fr:number[];
  Fr:number[];
}
export interface DadosTabelaDadosAgrupados {
  Amplitude:number;
  NumeroDeElementos:number;
  QuantidadeIntervalos:number;
  Intervalo:number;
  ValorMinimo:number;
  ValorMaximo:number;
  Moda:object;
  Mediana:object;
  Media:object;
  DesvioPadrao:object;
  Variancia:object;
  Passos:object;
}
@Component({
  selector: 'app-tabela-dados-agrupados',
  templateUrl: './tabela-dados-agrupados.component.html',
  styleUrls: ['./tabela-dados-agrupados.component.css']
})

export class TabelaDadosAgrupadosComponent implements OnInit {
  
  constructor(public restApi: RestApiService, public dialog: MatDialog) {  }
  
  @ViewChild(MatTable) MatTable: MatTable<any>;
  tabela:TabelaDadosAgrupados[] = [];
  DadosTabela:DadosTabelaDadosAgrupados = null;
  GerarTabela(dados :string){
    this.restApi.getTabelaDadosAgrupados(dados).subscribe(data => {
      data = JSON.parse(data);
      this.tabela = [];
      this.DadosTabela = null;

      for (let i = 0; i < data.QuantidadeIntervalos; i++)
      {
          this.tabela.push(
            {
              intervalos:data.intervalos[i],
              xi:data.xi[i],
              fi:data.fi[i],
              Fi:data.Fi[i],
              fr:data.fr[i],
              Fr:data.Fr[i],
            });
        }
        this.DadosTabela = {
            Amplitude:data.Amplitude,
            NumeroDeElementos:data.NumeroDeElementos,
            QuantidadeIntervalos:data.QuantidadeIntervalos,
            Intervalo:data.Intervalo,
            ValorMinimo:data.ValorMinimo,
            ValorMaximo:data.ValorMaximo,
            Moda:data.Moda,
            Passos:data.Passos,
            Mediana:data.Mediana,
            Media:data.Media,
            DesvioPadrao:data.DesvioPadrao,
            Variancia:data.Variancia
        };
        console.log(this.DadosTabela);
        this.MatTable.renderRows();
    });
  }

  openDialog(operacao,passos): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: {operacao: operacao, passos:  passos}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  displayedColumns: string[] = ['intervalos', 'xi', 'fi', 'Fi','fr','Fr'];

  ngOnInit(): void {
    this.GerarTabela("1,2,3,4");
  }

}
