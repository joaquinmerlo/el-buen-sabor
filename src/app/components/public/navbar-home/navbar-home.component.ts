import { Component, OnInit } from "@angular/core";
import { CommonLoginComponent } from "../common-login/common-login.component";
import { AuthService } from "src/app/services/auth.service";
import { MatDialog } from "@angular/material";
import { User } from "src/app/models/user";
import { ClienteService } from "src/app/services/cliente/cliente.service";

@Component({
  selector: "app-navbar-home",
  templateUrl: "./navbar-home.component.html",
  styleUrls: ["./navbar-home.component.scss"]
})
export class NavbarHomeComponent implements OnInit {
  user: User = null;
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(u => {
      this.user = u ? u : null;
    });
  }

  logIn() {
    const dialogRef = this.dialog.open(CommonLoginComponent, {
      width: "450%"
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      //Si uso otros providers enviar a crear usuario ;
    });
  }

  logOut() {
    this.auth.signOut();
  }
}
