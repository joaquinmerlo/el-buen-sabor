import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/public/home/home.component";
import { AdminComponent } from "./components/administrador/admin/admin.component";
import { LoginComponent } from "./components/administrador/login/login.component";
import { AuthGuardService } from "./services/guards/auth-guard.service";
import { CocinaComponent } from "./components/administrador/cocina/cocina.component";
import { ArticuloComponent } from "./components/administrador/articulo/articulo.component";
import { RubroArticuloComponent } from "./components/administrador/rubro-articulo/rubro-articulo.component";
import { ArticuloManofacturadoComponent } from "./components/administrador/articulo-manofacturado/articulo-manofacturado.component";
import { HorarioComponent } from "./components/administrador/horario/horario.component";

import { CommonLoginComponent } from "./components/public/common-login/common-login.component";
import { AccountComponent } from "./components/public/account/account.component";
import { PedidosSinFacturaComponent } from "./components/administrador/pedidos/pedidos-sin-factura/pedidos-sin-factura.component";
import { FacturasComponent } from "./components/administrador/facturas/facturas.component";
import { ArticuloCounterComponent } from "./components/administrador/articulo-counter/articulo-counter.component";
import { PedidosComponent } from "./components/administrador/pedidos/pedidos.component";
import { ClientesComponent } from "./components/administrador/clientes/clientes.component";
import { ListUserComponent } from "./components/administrador/users/list/list-user.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: PedidosSinFacturaComponent
      },
      {
        path: "articulo",
        component: ArticuloComponent
      },
      { path: "rubro", component: RubroArticuloComponent },
      {
        path: "manofacturado",
        component: ArticuloManofacturadoComponent
      },
      {
        path: "horario",
        component: HorarioComponent
      },
      {
        path: "pedidosxfacturar",
        component: PedidosSinFacturaComponent
      },
      {
        path: "facturas",
        component: FacturasComponent
      },
      {
        path: "totalsales",
        component: ArticuloCounterComponent
      },
      {
        path: "pedidos",
        component: PedidosComponent
      },
      { path: "clientes", component: ClientesComponent },
      {
        path: "users",
        component: ListUserComponent
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "cocina",
    component: CocinaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "client-login",
    component: CommonLoginComponent
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
