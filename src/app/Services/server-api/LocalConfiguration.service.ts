import { Injectable } from '@angular/core';
import { ConfigurationParameters } from '.';
import { appGlobals } from '../../app.component';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocalConfigurationService implements ConfigurationParameters {

  constructor() {
    console.log('LocalConfigurationService constructor');
    this.credentials[appGlobals._bearerKey] = () => localStorage.getItem(appGlobals._bearerKey) || '';
    this.credentials[appGlobals._userIdKey] = () => localStorage.getItem(appGlobals._userIdKey) || '';
  }
  credentials: { [key: string]: string | (() => string | undefined) } = {};
  basePath: string = environment.apiUrl;

}
