import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users/users.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { SnackBarService } from "src/app/services/shared/snack-bar/snack-bar.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private userService: UsersService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(u => {
      if (u) {
        this.userService.getPermissionsByUser(u.email).then(array => {
          if (!array.includes("admin")) {
            this.snackBarService.openSnackBar(
              "No tiene permiso para acceder a esta sector :("
            );
            this.auth.signOut();
            this.router.navigate(["/login"]);
          }
        });
      }
    });
  }
}
