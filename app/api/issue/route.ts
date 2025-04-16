import { db } from '@/db'
import { issues } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const issues = await db.query.issues.findMany({})

    return NextResponse.json({ data: { issues } })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'nah' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const newIssueData = await req.json()
    const user = await getCurrentUser()

    const [newIssue] = await db
      .insert(issues)
      .values({
        userId: user?.id,
        ...newIssueData,
      })
      .returning()

    return NextResponse.json({ data: { newIssue } })
  } catch (error) {
    return NextResponse.json({ error: 'nah' }, { status: 500 })
  }
}

export const PATCH = async () => {}
