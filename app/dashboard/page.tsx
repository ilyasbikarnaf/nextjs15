import { getIssues } from '@/lib/dal'
import Link from 'next/link'
import Button from '../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { formatRelativeTime } from '@/lib/utils'
import { Priority, Status } from '@/lib/types'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/db/schema'

export default async function DashboardPage() {
  const issues = await getIssues()

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Issues</h1>
        <Link href="/issues/new">
          <Button>
            <span className="flex items-center">
              <PlusIcon size={18} className="mr-2" />
              New Issue
            </span>
          </Button>
        </Link>
      </div>
      {issues.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-dark-border-default dark:bg-dark-high">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500 dark:border-dark-border-default dark:bg-dark-elevated dark:text-gray-400">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-3">Created</div>
          </div>

          {/* Issue rows */}
          <div className="divide-y divide-gray-200 dark:divide-dark-border-default">
            {issues.map((issue) => (
              <Link
                key={issue.id}
                href={`/issues/${issue.id}`}
                className="block transition-colors hover:bg-gray-50 dark:hover:bg-dark-elevated"
              >
                <div className="grid grid-cols-12 items-center gap-4 px-6 py-4">
                  <div className="col-span-5 truncate font-medium">
                    {issue.title}
                  </div>
                  <div className="col-span-2">
                    <Badge status={issue.status as Status}>
                      {ISSUE_STATUS[issue.status as Status].label}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge priority={issue.priority as Priority}>
                      {ISSUE_PRIORITY[issue.priority as Priority].label}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(new Date(issue.createdAt))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-8 py-12 text-center dark:border-dark-border-default dark:bg-dark-high">
          <h3 className="mb-2 text-lg font-medium">No issues found</h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Get started by creating your first issue.
          </p>
          <Link href="/issues/new">
            <Button>
              <span className="flex items-center">
                <PlusIcon size={18} className="mr-2" />
                Create Issue
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
