export class SignUpInfo {
    username: string;
    password: string;
    email: string;
    registerAsAdmin: boolean;

    constructor(username: string, password: string, email: string, registerAsAdmin: boolean) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.registerAsAdmin = registerAsAdmin;
    }
}
