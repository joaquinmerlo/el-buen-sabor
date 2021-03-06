import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { UsersService } from "src/app/services/users/users.service";
import { User } from "firebase";
import { SnackBarService } from "src/app/services/shared/snack-bar/snack-bar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userService: UsersService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.emailFormGroup = this._formBuilder.group({
      emailControl: ["", [Validators.required, Validators.email]]
    });
    this.passwordFormGroup = this._formBuilder.group({
      passwordControl: ["", [Validators.minLength(6)]]
    });
  }

  login() {
    console.log(this.emailFormGroup.value.emailControl);
    this.auth
      .emailLogin(
        this.emailFormGroup.value.emailControl,
        this.passwordFormGroup.value.passwordControl
      )
      .then((u: User) => {
        this.userService
          .getPermissionsByUser(u.email)
          .then(array => {
            if (!array || array.length === 0) {
              this.snackBar.openSnackBar(
                "No tienes permisos para acceder al administrador. Pídelos"
              );
              this.router.navigate(["/"]);
            } else {
              if (array.length === 1 && array[0] === "cocina") {
                this.router.navigate(["/cocina"]);
              } else {
                this.router.navigate(["/admin"]);
              }
            }
          })
          .catch(() => {
            console.log("Error");
            this.router.navigate(["/"]);
          });
      });
  }
}
