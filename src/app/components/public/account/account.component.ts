import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";
import { Cliente } from "src/app/models/cliente";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/services/cliente/cliente.service";
import { PedidoService } from "src/app/services/pedido/pedido.service";
import { Pedido, EstadoPedido, TipoRetiro } from "src/app/models/pedido";
import { DetallePedido } from "src/app/models/detalle-pedido";
import { SocketService } from "src/app/services/shared/socket.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  user: User = null;
  cliente: Cliente = null;
  listPedido: Pedido[] = [];
  fromToday: Pedido[] = [];
  estadoPedido = EstadoPedido;
  tipoRetiro = TipoRetiro;
  constructor(
    private authService: AuthService,
    private router: Router,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((u: User) => {
      if (u) {
        this.user = u;
        this.getClient();
        this.socketService.socket.on("refreshPedido", () => {
          this.getPedidoByClient();
        });
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  getClient() {
    this.clienteService
      .getClienteByEmail(this.user.email)
      .subscribe((c: Cliente) => {
        if (c) {
          this.cliente = c;
          this.getPedidoByClient();
        }
      });
  }

  getPedidoByClient() {
    this.pedidoService
      .getPedidoByQuery({ cliente: this.cliente._id })
      .subscribe((p: Pedido[]) => {
        if (p) {
          this.listPedido = p;
          this.fromToday = this.listPedido.filter(
            x =>
              new Date(x.fecha).toDateString() ===
              new Date(Date.now()).toDateString()
          );
        }
      });
  }

  getTotal(listDetalle: DetallePedido[]) {
    return listDetalle
      .map(d => d.subtotal)
      .reduce((a, b) => {
        return a + b;
      });
  }
  getOlds() {
    return this.listPedido.filter(a => a.estado > 0);
  }

  logOut() {
    this.authService.signOut();
  }
}
