import { Icons } from '@/src/components/Icons'
import { authOptions } from '@/src/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode} from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = async ({children}: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if(!session) notFound()
    return <div className='w-full flex h-screen'>
        <div className='flex h-full w-full max-x-xs grow flex-col 
                        gp-y-5 overflow-y-auto border-r border-gray-300 bg-white px-6'>
                            <Link className='flex h-16 shrink- items-center' href='/dashboard'>
                                <Icons.Logo className='h-8 w-auto text-indigo-600' />
                            </Link>
                            {children}
                        </div>
        
        </div>
}

export default  Layout