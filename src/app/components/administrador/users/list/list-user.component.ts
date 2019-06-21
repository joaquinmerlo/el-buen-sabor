import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users/users.service";
import { SocketService } from "src/app/services/shared/socket.service";

@Component({
  selector: "app-list",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.scss"]
})
export class ListUserComponent implements OnInit {
  usersList: any[] = [];
  constructor(
    private userService: UsersService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.socketService.socket.on("refreshUsers", () => {
      this.getUsers();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(u => {
      this.usersList = u;
    });
  }
}
