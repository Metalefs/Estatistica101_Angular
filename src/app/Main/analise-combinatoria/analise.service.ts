import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnaliseService {
    apiURL = environment.endpoint;
    anagramaURL = this.apiURL + 'AnaliseCombinatoria/Anagramas';
    fatorialURL = this.apiURL + 'AnaliseCombinatoria/Fatorial';
    arranjoURL = this.apiURL + 'AnaliseCombinatoria/Arranjo';
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
    })

}
//
private IsLoading = true;
// HttpClient API get() method => Fetch
getAnagrama(valor) {
    return this.http.get<any>(this.anagramaURL+"/"+valor,this.httpOptions).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getFatorial(valor, repeticoes = 0) {
    return this.http.get<any>(this.fatorialURL+"/"+valor,this.httpOptions).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}
getArranjo(valor, repeticoes = 0) {
    return this.http.get<any>(this.arranjoURL+"/"+valor,this.httpOptions).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    )
}

getFactorialLocal(valor, repeticoes = 0){
  var resultado = 1;
  for (let cont = parseInt(valor); repeticoes > 0 ? cont >= valor - repeticoes: repeticoes == 1 ? cont >= valor : cont >= 1; cont--)
  {
      resultado *= cont;
  }
  return resultado;
}

getCombinacaoLocal(valor,combinacao:string[]){
  return this.getFactorialLocal(valor) / (this.getFactorialLocal(valor - parseFloat(combinacao[0])) * this.getFactorialLocal(combinacao));
}
getPermutacaoComRepeticaoLocal(valor, repeticoes= [0]){
  let result = this.getFactorialLocal(valor);
  let denominador;
  repeticoes.forEach(rep=>{
    denominador *= this.getFactorialLocal(rep);
  });
  return result/denominador;
}
getArranjoLocal(valor, repeticoes = 0){
  return this.getFactorialLocal(valor) / this.getFactorialLocal(valor-repeticoes);
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
