import JWT, {JwtPayload} from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
    const token = JWT.sign(payload,process.env.JWT_SECRET as string,{
        expiresIn: '180d'
    });
    return token;
};