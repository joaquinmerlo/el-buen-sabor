import { Injectable, Component } from "@angular/core";
import { HttpService, URL_SERVER } from "../http.service";
import { Articulo } from "src/app/models/articulo";
import { HttpClient } from "@angular/common/http";

const route = "articulo/";
const routeManofacturado = "manofacturado/";
@Injectable({
  providedIn: "root"
})
export class ArticuloService {
  constructor(
    private httpService: HttpService,
    private httpCliente: HttpClient
  ) {}

  getArticulos() {
    return this.httpService.get(route);
  }
  getTotalSales() {
    return this.httpService.get("totalsales/");
  }
  getArticulosByQuery(query: any) {
    return this.httpCliente.post<Articulo[]>(
      URL_SERVER + route + "byquery/",
      query
    );
  }

  decreaseStock(queries: any) {
    return this.httpService.post(route + "decreasestock/", queries);
  }

  addArticulo(articulo: Articulo) {
    return this.httpService.post(route, articulo);
  }

  updateArticulo(id: string, articulo: Articulo) {
    return this.httpService.put(route + id, articulo);
  }

  deleteArticulo(id: string) {
    return this.httpService.delete(route + id);
  }

  getArticuloManofacturado() {
    return this.httpService.get(routeManofacturado);
  }
  addArticuloManofacturado(artManofacturado: any) {
    return this.httpService.post(routeManofacturado, artManofacturado);
  }
  updateArticuloManofacturado(id:string,artManofacturado:any){
    return this.httpService.put(routeManofacturado+id,artManofacturado);
  }
  deleteArticuloManofacturado(id: string) {
    return this.httpService.delete(routeManofacturado + id);
  }
}
