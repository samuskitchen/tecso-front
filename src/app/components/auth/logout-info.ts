import { DeviceInfo } from '../auth/device-Info';

 export class LogoutInfo{
    deviceInfo: DeviceInfo;

    constructor(deviceInfo: DeviceInfo) {
        this.deviceInfo = deviceInfo;
    }
 }