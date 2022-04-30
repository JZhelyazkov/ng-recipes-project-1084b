import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    constructor(
        private authServ: AuthService, 
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
        ) { }
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    isLoginMode = true;
    errorMessage: string = null;
    isLoading = false;
    private closeSub: Subscription;

    ngOnDestroy(): void {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    onHandleError() {
        this.errorMessage = null;
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;

    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authServ.login(email, password);
        } else {
            authObs = this.authServ.signup(email, password);
        }

        authObs.subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['/recipes'])
            console.log(resData);
        }, error => {
            console.log(error);
            this.errorMessage = error;
            this.authErrorAlert(error);
            this.isLoading = false;
            }
        )
        form.reset();
    }

    private authErrorAlert(message: string) {
        //const alertComp = new AlertComponent();
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }
}
