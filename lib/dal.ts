import { db } from '@/db'
import { getSession } from './auth'
import { eq, ne } from 'drizzle-orm'
import { cache } from 'react'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'
import { unstable_cacheTag as cacheTag } from 'next/cache'

export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session) {
    return null
  }

  try {
    const results = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return results[0] || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
})

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getIssues = async () => {
  'use cache'
  cacheTag('issues')

  try {
    const result = await db.query.issues.findMany({
      with: {
        user: true,
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    })

    return result
  } catch (error) {
    console.log('Error fetchign issues', error)
    throw new Error('Failed to fetch issues')
  }
}

export const getIssue = async (id: number) => {
  try {
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: { user: true },
    })

    return issue
  } catch (error) {
    console.log(error)
    return null
  }
}
