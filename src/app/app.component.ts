import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "el-buen-sabor";

  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
