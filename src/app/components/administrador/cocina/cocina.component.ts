import { Component, OnInit } from "@angular/core";
import { PedidoService } from "src/app/services/pedido/pedido.service";
import { SocketService } from "src/app/services/shared/socket.service";
import { Pedido, TipoRetiro, EstadoPedido } from "src/app/models/pedido";
import { ConfirmDialogService } from "src/app/services/shared/confirm.dialog/confirm-dialog.service";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users/users.service";
import { Router } from "@angular/router";
import { ArticuloService } from "src/app/services/articulo/articulo.service";
import { DetallePedido } from "src/app/models/detalle-pedido";
import { SnackBarService } from "src/app/services/shared/snack-bar/snack-bar.service";

@Component({
  selector: "app-cocina",
  templateUrl: "./cocina.component.html",
  styleUrls: ["./cocina.component.scss"]
})
export class CocinaComponent implements OnInit {
  listPedido: Pedido[] = [];
  tipoRetiro = TipoRetiro;
  constructor(
    private pedidoService: PedidoService,
    private ioService: SocketService,
    private confirmDialog: ConfirmDialogService,
    private auth: AuthService,
    private userService: UsersService,
    private router: Router,
    private articuloService: ArticuloService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(u => {
      if (u) {
        this.userService.getPermissionsByUser(u.email).then(array => {
          if (array.length === 0 || !array.includes("cocina")) {
            this.snackBarService.openSnackBar(
              "No tiene permiso para acceder a esta parte del sitio :(."
            );
            this.auth.signOut();
            this.router.navigate(["/login"]);
          } else {
            this.getPedidos();
            this.ioService.socket.on("refreshPedido", () => {
              this.getPedidos();
            });
          }
        });
      }
    });
  }

  getPedidos() {
    this.pedidoService.getPedidoByQuery({ estado: 0 }).subscribe(p => {
      if (p) {
        console.log(p);
        this.listPedido = p.sort((a, b) => {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
            return -1;
          }
          return 0;
        });
      }
    });
  }

  updatePedido(pedido: Pedido) {
    this.confirmDialog
      .getConfirmation(
        "Enviar a facturar el pedido numero :" + pedido.numero + " ?"
      )
      .then((confirmation: boolean) => {
        if (confirmation) {
          this.pedidoService
            .updatePedido(pedido._id, { estado: 1 })
            .toPromise()
            .then(() => this.decreaseStock(pedido.detalles));
        }
      });
  }

  async decreaseStock(detalles: DetallePedido[]) {
    const list: any[] = [];

    for (const det of detalles) {
      // Itero en detalles.
      if (det.onModel === "articulo") {
        const q = await {
          _id: det.articulo._id,
          cantidad: det.cantidad
        };
        await list.push(q);
      } else {
        for (const a of det.articulo.detalle) {
          // Itero en detalle de los manofacturados para multiplicar
          const qM = await {
            _id: a.articulo,
            cantidad: a.cantidad * det.cantidad // Multiplico la cantidad perida x cantidad de utilizado en MF
          };
          await list.push(qM);
        }
      }
    }
    await this.articuloService
      .decreaseStock(list)
      .toPromise()
      .then(() => {
        console.log("Stock actualizado");
      });
  }
}