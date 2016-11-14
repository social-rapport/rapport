 import { Component, Inject } from '@angular/core';
 import { Headers, Http } from '@angular/http';
 import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'gmail-login',
    template: '<p>gmail</p><button (click)="login()"></button>',
})
//
export class GmailLoginComponent {
    //@Inject('Window') _window: Window,
    constructor (private http: Http) {
        
    }
    
    authWindow = null;
    
    getUrl(): void {
        var geturl = '/url';
        this.http.get(geturl).map((res:any) => res.text())
            .subscribe(
                data => this.handleResponse(data),
                err => this.logError(err),
            );
    }

    handleResponse(data: string) {
        console.log(data);
        var self = this;
        var authWindow = window.open(data,"Please sign in with Google", "width=500px,height:700px");
        var pollTimer   =   window.setInterval(function() { 
                try {
                    console.log(authWindow.document.URL);
                    if (authWindow.document.URL.indexOf('localhost') != -1) {
                        window.clearInterval(pollTimer);
                        authWindow.close();
                        var urlWithCode = authWindow.document.URL;
                        var idx = urlWithCode.lastIndexOf("code=");
                        var code = urlWithCode.substring(idx + 5).replace("#","");
                        // console.log(code);
                        self.http.get("tokens?code=" + code).toPromise().then(function(response) {
                            console.log('server response 2', response);
                        });
                    }
                } catch(e) {
                }
            }, 100);
        }

    logError(err: any) {
        console.log(err);
    }

    login(): void{
        this.getUrl();
    }

    ngOnInit(): void {
        //this.getUrl();
    }
}
