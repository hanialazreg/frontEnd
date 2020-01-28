import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpService } from "src/app/services/http/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-entrance",
  templateUrl: "./entrance.component.html",
  styleUrls: ["./entrance.component.scss"]
})
export class EntranceComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}
  submitSignInForm(form: NgForm) {
    this.http.post("/users/authenticate", form.value).subscribe((data:any) => {
      if (data["success"]) {
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("username", data.user.username)
        localStorage.setItem("id", data.user._id)
        location.reload();
      }
    });
  }
  submitSignUpForm(form: NgForm) {
      this.http.post("/users/register" , form.value).subscribe((data:any) => {
        if(data.success)
        this.submitSignInForm(form)
      })
  }

  ngOnInit() {}
}
