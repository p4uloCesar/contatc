import { Injectable } from '@angular/core';
import {HttpInterceptor} from '../../service/http-interceptor';
import {BaseService} from '../../service/base.service';
import {ContactModel} from './contact-model';
import {PhoneModel} from './phone-model';
import {AddressModel} from './address-model';
import {Observable} from 'rxjs';

@Injectable()
export class ContactService extends BaseService<ContactModel> {

    constructor(protected http: HttpInterceptor) {
        super(http, 'register/'); }
}
@Injectable()
export class PhoneService extends BaseService<PhoneModel> {

    constructor(protected http: HttpInterceptor) {
        super(http, 'phone/'); }

    public getTypePhone() {
        this.clearParameter();
        return this.http.get(this.fullUrl + 'get_phone_type/', this.addOptions(this.parameters)).map(
            response => response.json()
        ).catch(
            ex => Observable.throw(ex)
        );
    }
}
@Injectable()
export class AddressService extends BaseService<AddressModel> {

    constructor(protected http: HttpInterceptor) {
        super(http, 'address/'); }
}
