import { Injectable } from '@angular/core';

// _email
// tslint:disable-next-line:max-line-length
export const emailRegex =
  /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/i;
// _zipCode
export const zipCodeRegex = /^\d{3,3}\s?\d{2,2}$/i;
// _registrationNumber
export const registrationNumberRegex = /^\d{6}\-\d{4}$/i;
// _phoneNumber
// tslint:disable-next-line:max-line-length
export const phoneNumberRegex = /^\+\d{1,3}\ \d{1,2}\ \d{7}$/;

export const illegalCharacterRegex = /^[^<>%=]+$/;

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public email = (email: string) => {
    return emailRegex.test(email);
  };

  public phone = (phone: string) => {
    return phoneNumberRegex.test(phone);
  };

  constructor() {}
}
