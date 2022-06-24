import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  baseUri:string='http://localhost:4800/api';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }
  //metodo para agregar un nuevo empleado
  agregarEmpleado(data):Observable<any>{
    let url=`$(this.baseUri)/create}`;
    return this.http.post(url,data).pipe(catchError(this.errorManagement));
    }
    //método para obtener a todos los empleados
    getEmpleados(){
      let url=`$(this.baseUri)/empleados`;
      return this.http.get(url);
  }

  //metodo para obtener un solo empleado
  getEmpleado(id){
    let url=`$(this.baseUri)/empleado/$(id)`;
    return this.http.get(url,{headers:this.headers}).pipe(
      map((res:Response)=>{
        return res||{};
      }),
      catchError(this.errorManagement)
    );

  }

  //metodo para actualizar un empleado
  updateEmpleado(id,data):Observable<any>{
    let url=`$(this.baseUri)/update/$(id)`;
    return this.http.put(url,data,{headers:this.headers}).pipe(
      catchError(this.errorManagement)
    );
  }

  //metodo para eliminar un empleado
  deleteEmpleado(id){
    let url=`$(this.baseUri)/delete/$(id)`;
    return this.http.delete(url,{headers:this.headers}).pipe(catchError(this.errorManagement)
    );
  }

  //manejador de errores
  errorManagement(error:HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      //obtenemos el error del lado del cliente
      errorMessage=error.error.message;
    }else{
      //obtenemos el rror del lado del swervidor
      errorMessage=`Codigo de error: $(error.status)\nMensaje: $(error.message)`;

    }
    console.log(errorMessage);
    return throwError(()=>{
      return errorMessage;
    });
  }
}
