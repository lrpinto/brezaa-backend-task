import User from "../models/user"

const expressJwt = require('express-jwt');

const jwt = () => {
    const secret = process.env.SECRET;
    return expressJwt({ secret, algorithms: ['HS256'], _isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/users/signup',
            '/users/login',
            '/users/getAllSellers',
            '/getSellerReviews/',
            '/getNearestSellers/'
        ]
    });
}

const _isRevoked = async (req: Request, payload: string, done: (arg0: null | undefined, arg1: boolean | undefined) => void | PromiseLike<void>): Promise<void> => {
    const user = await User.findById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done(undefined, undefined);
};

export { jwt }