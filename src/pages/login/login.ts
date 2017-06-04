import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fireAuth: AngularFireAuth) {
      this.loginForm = this.buildLoginForm();
  }

  ionViewDidLoad() {

  }

  private buildLoginForm() {
    return this.fb.group({
      'email': ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      'password': ['', Validators.required]
    });
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión..',
      dismissOnPageChange: true
    });

    loading.present();

    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      loading.dismiss(); 
      this.toastCtrl.create({
        message: 'Bienvenido',
        duration: 2000
      }).present();
      this.navCtrl.setRoot('HomePage');
    })
    .catch(err =>{
      console.log(err)
      loading.dismiss();
      this.toastCtrl.create({
        message: 'Ha ocurrido un error',
        duration: 2000
      }).present();
    })
  }
  goToRegisterPage(){
    this.navCtrl.push('RegisterPage');
  }

}
