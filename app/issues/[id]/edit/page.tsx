import { getIssue } from '@/lib/dal'
import IssueForm from '@/app/components/IssueForm'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
export default async function EditIssuePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const issue = await getIssue(parseInt(id))

  if (!issue) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-8">
      <Link
        href={`/issues/${id}`}
        className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Issue
      </Link>

      <h1 className="mb-6 text-2xl font-bold">Edit Issue</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-dark-border-default dark:bg-dark-elevated">
        <IssueForm userId={issue.userId} issue={issue} isEditing />
      </div>
    </div>
  )
}
