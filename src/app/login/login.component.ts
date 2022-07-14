import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  private formSubmitAttempt: boolean = false;
  
  constructor(private formBuilder : FormBuilder, 
              private authService : AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      password:['', [Validators.min(4), Validators.required]]
    })
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }


  login(){
    if(this.loginForm.invalid){
      this.formSubmitAttempt = true;
    }else{
      this.authService.login(this.loginForm.value);
    }
  }

}
