import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ToastService} from './service/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translate: TranslateService,
                protected toast: ToastService) {
        translate.setDefaultLang('en');
    }
}
