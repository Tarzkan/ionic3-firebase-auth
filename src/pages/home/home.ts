import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  user: firebase.User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
      this.user = this.fireAuth.auth.currentUser;
  }

  ionViewDidLoad() {
  }
  
  confirmSignOut() {
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
    alert.present();
  }

  signOut(){

    this.fireAuth.auth.signOut()
    .then(res =>{
      console.log(res)
      this.toastCtrl.create({
        message: 'Sesión cerrada exitósamente',
        duration: 2000
      }).present();
    })
    .catch(err =>{
      console.log(err)
      this.toastCtrl.create({
        message: 'Ha ocurrido un error',
        duration: 2000
      }).present();
    })
  }

  emailverify(){

    this.fireAuth.auth.currentUser.sendEmailVerification()
    .then(res => {
      console.log(res)
      this.alertCtrl.create({
        title: 'Correo enviado',
        subTitle: 'Por favor revisa tu bandeja de entrada',
        buttons: ['Aceptar']
      }).present();
    })
    .catch(err =>{
      console.log(err)
      this.toastCtrl.create({
        message: 'Ha ocurrido un error',
        duration: 2000
      })
    })
  }

}
