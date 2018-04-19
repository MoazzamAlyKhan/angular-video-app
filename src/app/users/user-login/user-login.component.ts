import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {
  
    constructor(public auth: AuthService,
                private router: Router) { }
  
    /// Login using google 
  

    signInWithGoogle() {
      this.auth.googleLogin()
        .then(() => this.afterSignIn());
    }

  
    /// pass the login info to router
  
    private afterSignIn() {
      // Do after login stuff here, such router redirects, toast messages, etc.
      this.router.navigate(['/']);
    }
  
  }
  