import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TabelaService {
    apiURL = environment.endpoint;
    tabela_dados_agrupadosURL = this.apiURL + 'Distribuicao/TabelaDistribuicao';
    mediaURL = this.apiURL + 'Distribuicao/ObterMedia';
    medianaURL = this.apiURL + 'Distribuicao/ObterMediana';
    modaURL = this.apiURL + 'Distribuicao/ObterModa';
    desvio_padraoURL = this.apiURL + "Distribuicao/ObterDesvioPadrao";
    varianciaURL = this.apiURL + 'Distribuicao/ObterVariancia';
    coeficienteVariacaoURL = this.apiURL + 'Distribuicao/ObterCoeficienteVariacao';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
    })

}
//
private IsLoading = true;
// HttpClient API get() method => Fetch
getTabelaDadosAgrupados(valores) {
    return this.http.get<any>(`${this.tabela_dados_agrupadosURL}/${valores}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getMedia(valores) {
    return this.http.get<any>(`${this.mediaURL}/${valores}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getMediana(valores) {
    return this.http.get<any>(`${this.medianaURL}/${valores}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getModa(valores) {
    return this.http.get<any>(`${this.modaURL}/${valores}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getDesvioPadrao(valores) {
    return this.http.get<any>(`${this.desvio_padraoURL}/${valores}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getVariancia(valores) {
    return this.http.get<any>(`${this.varianciaURL}/${valores}`).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getCoeficienteVariacao(valores) {
  return this.http.get<any>(`${this.coeficienteVariacaoURL}/${valores}`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
  )
}
// Page Loading state

getLoadingState(){
    return this.IsLoading;
}
setIsLoading(state : boolean){
    this.IsLoading = state;
    if(state == false){
        document.getElementById("loadingBackdrop").className = "modal-backdrop";
        document.getElementById("loading").className = '';
    } else {
        document.getElementById("loading").className = 'active';
    }
}
// Error handling
handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
      return throwError(errorMessage);
    }
}
