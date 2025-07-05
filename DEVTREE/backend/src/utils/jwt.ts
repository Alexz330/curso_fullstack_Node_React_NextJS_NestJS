import JWT, {JwtPayload} from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
    const token = JWT.sign(payload,process.env.JWT_SECRET as string,{
        expiresIn: '180d'
    });
    return token;
};

export const verifyJWT = (token: string) => {
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (error) {
        return null;
    }
};
