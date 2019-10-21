import * as jwt from 'jsonwebtoken';

export const getUserId = (context) => {
    const Authorization = context.request.headers['authorization'];
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
};
