import { ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'

export const isAuthenticated = (paren, args, { me }) => me ? skip : new ForbiddenError('Not authenticated as user.')

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) => role === 'ADMIN'
    ? skip
    : new ForbiddenError('Not authorized as admin.')
)

export const isMessageOwner = async (
  parent,
  { id },
  { models, me }
) => {
  const message = await models.Message.findById(id, { raw: true })

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }

  return skip
}

export const isPostOwner = async (
  parent,
  { id },
  { models, me }
) => {
  const post = await models.Post.findById(id, { raw: true })

  if (post.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.')
  }

  return skip
}