import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbaradmin",
  templateUrl: "./navbaradmin.component.html",
  styleUrls: ["./navbaradmin.component.scss"]
})
export class NavbaradminComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signOut() {
    this.authService.signOut();
  }
}
