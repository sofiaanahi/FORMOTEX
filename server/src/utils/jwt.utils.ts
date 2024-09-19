import jwt from 'jsonwebtoken';
import  JWT_SECRET  from "../config/enviroments";

export const createJWT = (payload: {id: number, role: string}) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET as unknown as string, { expiresIn: '1h'}, (err, token)=> {
            if ( err ){
                reject("error mientras de creación de token");
            } else {
                resolve(token as string);
            }
        })
        }
    )
}