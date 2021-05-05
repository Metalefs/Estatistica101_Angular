import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaDadosAgrupadosComponent } from './tabela-dados-agrupados.component';
import { MediaComponent } from './media/media.component';
import { MedianaComponent } from './mediana/mediana.component';
import { ModaComponent } from './moda/moda.component';
import { DesvioPadraoComponent } from './desvio-padrao/desvio-padrao.component';
import { VarianciaComponent } from './variancia/variancia.component';
import { CoeficienteVariacaoComponent } from './coeficiente-variacao/coeficiente-variacao.component';

const routes: Routes = [
    {
      path: '', component: TabelaDadosAgrupadosComponent,
      children:[
        {
          path: 'media',
          component: MediaComponent
        },
        {
          path: 'mediana',
          component: MedianaComponent
        },
        {
          path: 'moda',
          component: ModaComponent
        },
        {
          path: 'desvioPadrao',
          component: DesvioPadraoComponent
        },
        {
          path: 'variancia',
          component: VarianciaComponent
        },
        {
          path: 'coeficienteVariacao',
          component: CoeficienteVariacaoComponent
        },
      ]
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AgrupamentoRoutingModule { }
