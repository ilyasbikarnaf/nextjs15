import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import NewIssue from '@/app/components/NewIssue'

export default async function NewIssuePage() {
  return (
    <div className="mx-auto max-w-3xl p-4 md:p-8">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Dashboard
      </Link>

      <h1 className="mb-6 text-2xl font-bold">Create New Issue</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-dark-border-default dark:bg-dark-elevated">
        <Suspense fallback={<div>Loading...</div>}>
          <NewIssue />
        </Suspense>
      </div>
    </div>
  )
}
