import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/public/home/home.component";
import { NavbaradminComponent } from "./components/administrador/navbaradmin/navbaradmin.component";
import { LoginComponent } from "./components/administrador/login/login.component";
import { AdminComponent } from "./components/administrador/admin/admin.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { environment } from "src/environments/environment.prod";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "./services/auth.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CocinaComponent } from "./components/administrador/cocina/cocina.component";
import { HttpClientModule } from "@angular/common/http";
import {
  ArticuloComponent,
  ArticuloDialogComponent
} from "./components/administrador/articulo/articulo.component";
import { RubroArticuloComponent } from "./components/administrador/rubro-articulo/rubro-articulo.component";
import { SnackBarComponent } from "./components/shared/snack-bar/snack-bar.component";
import { MAT_DATE_LOCALE } from "@angular/material";
import { ConfirmDialogComponent } from "./components/shared/confirm-dialog/confirm-dialog.component";
import { ArticuloManofacturadoComponent } from "./components/administrador/articulo-manofacturado/articulo-manofacturado.component";
// tslint:disable-next-line: max-line-length
import { EditManofacturadoComponent } from "./components/administrador/articulo-manofacturado/edit-manofacturado/edit-manofacturado.component";
import {
  HorarioComponent,
  HorarioDialogComponent
} from "./components/administrador/horario/horario.component";
import { CommonLoginComponent } from "./components/public/common-login/common-login.component";
import { ClienteComponent } from "./components/public/cliente/cliente.component";
import { NavbarHomeComponent } from "./components/public/navbar-home/navbar-home.component";
import { AmountDialogComponent } from "./components/public/home/amount-dialog/amount-dialog.component";
import { HourDialogComponent } from "./components/public/home/hour-dialog/hour-dialog.component";
import { AccountComponent } from "./components/public/account/account.component";
import { PedidosSinFacturaComponent } from "./components/administrador/pedidos/pedidos-sin-factura/pedidos-sin-factura.component";
import { FacturasComponent } from "./components/administrador/facturas/facturas.component";
import { ArticuloCounterComponent } from "./components/administrador/articulo-counter/articulo-counter.component";
import { PedidosComponent } from "./components/administrador/pedidos/pedidos.component";
import { ClientesComponent } from "./components/administrador/clientes/clientes.component";
import { UsersComponent } from "./components/administrador/users/users.component";
import { ListUserComponent } from "./components/administrador/users/list/list-user.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbaradminComponent,
    LoginComponent,
    AdminComponent,
    CocinaComponent,
    ArticuloComponent,
    ArticuloDialogComponent,
    RubroArticuloComponent,
    SnackBarComponent,
    ConfirmDialogComponent,
    ArticuloManofacturadoComponent,
    EditManofacturadoComponent,
    HorarioComponent,
    HorarioDialogComponent,
    CommonLoginComponent,
    ClienteComponent,
    NavbarHomeComponent,
    AmountDialogComponent,
    HourDialogComponent,
    AccountComponent,
    PedidosSinFacturaComponent,
    FacturasComponent,
    ArticuloCounterComponent,
    PedidosComponent,
    ClientesComponent,
    UsersComponent,
    ListUserComponent
  ],
  entryComponents: [
    ArticuloDialogComponent,
    SnackBarComponent,
    ConfirmDialogComponent,
    HorarioDialogComponent,
    CommonLoginComponent,
    AmountDialogComponent,
    HourDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: "es" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
