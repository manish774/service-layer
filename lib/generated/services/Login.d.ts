import { ILogin, ILogout, IToken } from "../models/Login";
export declare class Login {
    login(props: ILogin): Promise<any>;
    logout(props: ILogout): Promise<any>;
    token(props: IToken): Promise<any>;
}
