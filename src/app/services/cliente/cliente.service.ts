import { Injectable } from "@angular/core";
import { HttpService, URL_SERVER } from "../http.service";
import { HttpClient } from "@angular/common/http";
import { Cliente } from "src/app/models/cliente";
const routeCliente = "cliente/";
@Injectable({
  providedIn: "root"
})
export class ClienteService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  getCliente(id?: string) {
    return this.httpService.get(routeCliente + id);
  }

  getClienteByEmail(email: string) {
    return this.httpService.get(routeCliente + "byemail/" + email);
  }

  getClientesByQuery(query: any) {
    return this.http.post<Cliente[]>(
      URL_SERVER + routeCliente + "byquery/",
      query
    );
  }

  addCliente(cliente: any) {
    return this.httpService.post(routeCliente, cliente);
  }

  updateCliente(id: string, cliente: any) {
    return this.httpService.put(routeCliente + id, cliente);
  }

  deleteCliente(id: string) {
    return this.httpService.get(routeCliente + id);
  }
}
