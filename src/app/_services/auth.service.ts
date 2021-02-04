import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
//...omitted

@Injectable()
export class AuthService {
  
  async resetPassword(email: string) {
    var auth = firebase.auth();
    try {
          await auth.sendPasswordResetEmail(email);
          return console.log("email sent");
      }
      catch (error) {
          return console.log(error);
      }
  }
  
}