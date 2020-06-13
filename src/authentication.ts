import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UserViewModel, UserAuthenticated } from "./viewModels/user.viewmodel";

export const jwtSecret = "3yFba5t6HgUZF4eHu8vYOGtrdqJvZ2hDHA2M8XRWvSo=";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {

    const token = (
        (request.body.token ||
            request.query.token ||
            request.headers.authorization) as string).substr(7);



    return new Promise<UserAuthenticated>((resolve, reject) => {
        if (!token) {
            return reject(new Error("No token provided"));
        }
        jwt.verify(token, jwtSecret, function (err: any, decoded: any) {
            if (err) {
                return reject(err);
            } else {
                if (scopes != undefined) {
                    for (let scope of scopes) {
                        if (!decoded.scopes.includes(scope)) {
                            reject(new Error("JWT does not contain required scope."));
                        }
                    }
                }
                return resolve(decoded as UserAuthenticated);
            }
        });
    });
}