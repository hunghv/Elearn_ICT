import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BackgroundLoader } from '../../shared/services/background-loader/background-loader.service';
import { AuthService } from '../../shared/services/authentication/auth.service';


@Component({
    selector: 'iap-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginFailed: boolean = false;
    userProfile: object;
    model: any = {};
    error;
    token;

    constructor(private authService: AuthService, private router: Router) {
        // Tweak config for implicit flow.
        // This is just needed b/c this demo uses both,
        // implicit flow as well as password flow
    }

    ngOnInit() {
        this.authService.startAuthentication();
        /*
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
            this.oauthService.initImplicitFlow('some-state');
            }
        });
        */

        // if (this.oauthService.getAccessToken()) {
        //     localStorage.setItem('currentUser', JSON.stringify({ username: 'submitter', token: 'token' }));
        //     window.location.href = window.location.origin +'/web/my-task';
        // } else {
        //     setTimeout(() => {
        //         if (this.oauthService.getAccessToken()) {
        //             localStorage.setItem('currentUser', JSON.stringify({ username: 'submitter', token: 'token' }));
        //             window.location.href = window.location.origin +'/web/my-task';
        //         }
        //         else {
        //             this.oauthService.initImplicitFlow('/some-state;p1=1;p2=2');
        //         }
        //     }, 1000);
        // }
    }


    login() {
        // this.oauthService.initImplicitFlow('/some-state;p1=1;p2=2');
        // the parameter here is optional. It's passed around and can be used after logging in
    }

    logout() {
        // this.oauthService.logOut();
    }
}