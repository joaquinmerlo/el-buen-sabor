import { Injectable } from "@angular/core";
import { HttpService, URL_SERVER } from "../http.service";
import { Factura } from "src/app/models/factura";
import { HttpClient } from "@angular/common/http";

const routeFactura = "factura/";
@Injectable({
  providedIn: "root"
})
export class FacturaService {
  constructor(
    private httpService: HttpService,
    private httpClient: HttpClient
  ) {}

  getFactura(id: string) {
    return this.httpService.get(routeFactura + id);
  }

  getFacturas() {
    return this.httpService.get(routeFactura);
  }

  getByQuery(query: any) {
    return this.httpClient.post<Factura[]>(
      URL_SERVER + routeFactura + "byquery/",
      query
    );
  }

  addFactura(factura: Factura) {
    return this.httpClient.post<Factura>(URL_SERVER + routeFactura, factura);
  }
}
