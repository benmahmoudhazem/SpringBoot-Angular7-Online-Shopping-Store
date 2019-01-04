import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isInvalid: boolean;
    isLogout: boolean;
    submitted = false;
    model: any = {
        username: '',
        password: '',
        remembered: false
    };

    returnUrl = '/';

    constructor(private userService: UserService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        let params = this.route.snapshot.queryParamMap;
        this.isLogout = params.has('logout');
        this.returnUrl = params.get('returnUrl');
    }

    onSubmit() {
        this.submitted = true;
        this.userService.login(this.model).subscribe(
            user => {
                if (user) {
                    if (user.authorities[0].anthority != 'ROLE_CUSTOMER') {
                        this.returnUrl = '/seller';
                    }

                    this.router.navigateByUrl(this.returnUrl);
                } else {
                    this.isLogout = false;
                    this.isInvalid = true;
                }

            }
        );
    }

    fillLoginFields(u, p) {
        this.model.username = u;
        this.model.password = p;
        this.onSubmit();
    }
}
