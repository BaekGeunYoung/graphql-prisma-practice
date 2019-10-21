import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getUserId } from "../utils";

export const signup = async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.createUser({
        ...args,
        password
    });

    const token = jwt.sign({ userId : user.id }, process.env.JWT_SECRET)

    return {
        token,
        user,
    }
};

export const login = async (parent, args, context, info) => {
    const user = await context.prisma.user({ email: args.email});
    if(!user) throw new Error('No such user found');

    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid) throw new Error('Invalid Password');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return {
        token,
        user,
    }
};

export const post = (root, args, context) => {
    const userId = getUserId(context);

    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId }}
    })
};

export default {
    signup,
    login,
    post,
}