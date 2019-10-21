export const postedBy = (parent, args, context) => {
    return context.prisma.link({ id: parent.id }).postedBy()
};

export default {
    postedBy,
}