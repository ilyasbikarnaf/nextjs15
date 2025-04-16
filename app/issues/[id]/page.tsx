import { getIssue } from '@/lib/dal'
import { formatRelativeTime } from '@/lib/utils'
import { Priority, Status } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { ArrowLeftIcon, Edit2Icon } from 'lucide-react'
import DeleteIssueButton from '../../components/DeleteIssueButton'

export default async function IssutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const issue = await getIssue(parseInt(id))

  if (!issue) {
    notFound()
  }

  const { title, description, status, priority, createdAt, updatedAt, user } =
    issue

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'backlog':
        return 'Backlog'
      case 'todo':
        return 'Todo'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Low'
      case 'medium':
        return 'Medium'
      case 'high':
        return 'High'
      default:
        return priority
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeftIcon size={16} className="mr-1" />
          Back to Issues
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center space-x-2">
            <Link href={`/issues/${id}/edit`}>
              <Button variant="outline" size="sm">
                <span className="flex items-center">
                  <Edit2Icon size={16} className="mr-1" />
                  Edit
                </span>
              </Button>
            </Link>
            <DeleteIssueButton id={parseInt(id)} />
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-dark-border-default dark:bg-dark-elevated">
        <div className="mb-6 flex flex-wrap gap-3">
          <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          <Badge priority={priority as Priority}>
            {getPriorityLabel(priority)}
          </Badge>
          <div className="text-sm text-gray-500">
            Created {formatRelativeTime(new Date(createdAt))}
          </div>
          {updatedAt !== createdAt && (
            <div className="text-sm text-gray-500">
              Updated {formatRelativeTime(new Date(updatedAt))}
            </div>
          )}
        </div>

        {description ? (
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        ) : (
          <p className="italic text-gray-500">No description provided.</p>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-dark-border-default dark:bg-dark-elevated">
        <h2 className="mb-2 text-lg font-medium">Details</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">
              Assigned to
            </p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">Status</p>
            <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">Priority</p>
            <Badge priority={priority as Priority}>
              {getPriorityLabel(priority)}
            </Badge>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-500">Created</p>
            <p>{formatRelativeTime(new Date(createdAt))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
