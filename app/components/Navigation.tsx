import Link from 'next/link'
import { HomeIcon, PlusIcon, LogInIcon } from 'lucide-react'
import UserEmail from './UserEmail'
import { Suspense } from 'react'
import NavLink from './NavLink'

export default function Navigation() {
  return (
    <aside className="fixed inset-y-0 left-0 flex w-16 flex-col border-r border-gray-200 bg-gray-50 px-2 py-4 md:w-64 md:px-4 dark:border-dark-border-subtle dark:bg-[#1A1A1A]">
      <div className="mb-8 flex items-center justify-center px-2 md:justify-start">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          <span className="hidden md:inline">Mode</span>
          <span className="md:hidden">M</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col space-y-1">
        <NavLink
          href="/dashboard"
          icon={<HomeIcon size={20} />}
          label="Dashboard"
        />
        <NavLink
          href="/issues/new"
          icon={<PlusIcon size={20} />}
          label="New Issue"
        />
      </nav>

      <div className="border-t border-gray-200 pt-4 dark:border-dark-border-subtle">
        <Suspense
          fallback={
            <NavLink
              href="/signin"
              icon={<LogInIcon size={20} />}
              label="Sign In"
            />
          }
        >
          <UserEmail />
        </Suspense>
      </div>
    </aside>
  )
}
