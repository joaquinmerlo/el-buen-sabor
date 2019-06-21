import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { SnackBarComponent } from "src/app/components/shared/snack-bar/snack-bar.component";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 2500
    });
  }
}
