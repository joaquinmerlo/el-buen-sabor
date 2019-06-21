import { Injectable } from "@angular/core";
import { HttpService, URL_SERVER } from "src/app/services/http.service";
import { HttpClient } from "@angular/common/http";
import { Horario } from "src/app/models/horario";

@Injectable({
  providedIn: "root"
})
export class HorarioService {
  route = "apertura/";
  constructor(private http: HttpService, private httpClient: HttpClient) {}

  getHorarioSemanal(id?: string) {
    id = id ? id : "";
    return this.http.get(this.route + id);
  }

  updateHorario(id: string, dia: any) {
    return this.http.put(this.route + id, dia);
  }

  getHorarioByQuery(query: any) {
    return this.httpClient
      .post<Horario>(URL_SERVER + this.route + "byquery/", query)
      .toPromise()
      .then(data => {
        if (data) {
          return data;
        }
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }
}
