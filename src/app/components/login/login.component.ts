import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frm01: FormGroup;
  icon = faShop
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private _userService: UserService, private _errorService: ErrorService) {

    this.frm01 = new FormGroup({
      nombre: new FormControl(''),
      contrasena: new FormControl('')
    })
  }
  ngOnInit(): void {
  }

  fnIngresar() {

    let obj = this.frm01.value;
    if (obj.nombre == '' || obj.contrasena == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios.'
      });
      return;
    }

    const user: User = { username: obj.nombre, mail: '', password: obj.contrasena }
    Swal.fire({
      icon: 'info',
      title: 'Ingresando ...',
      html: '<div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>',
      showConfirmButton: false
    });
    // this._userService.logIn(user).subscribe({
    //   next: (token) => {
    //     localStorage.setItem('token', token)
    //     console.log(token)
    //     Swal.close()
    //     this.router.navigate(['/dashboard']);


    //   },
    //   error: (e: HttpErrorResponse) => {
    //     this._errorService.msJError(e)
    //   }

    // })
    Swal.close()
    this.router.navigate(['/catalogo']);
  }


}
