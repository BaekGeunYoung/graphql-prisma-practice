export const feed = (parent, args, context, info) => {
    return context.prisma.links();
};

export default {
    feed,
}