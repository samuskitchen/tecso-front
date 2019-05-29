import { DeviceInfo } from './device-Info';

export class AuthLoginInfo {
    username: string;
    password: string;
    email: string;
    deviceInfo: DeviceInfo;

    constructor(username: string, password: string, email: string, deviceInfo: DeviceInfo) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.deviceInfo = deviceInfo;
    }
}
