import Button from '@/src/components/ui/Button'
import { authOptions } from '@/src/lib/auth'
import { getServerSession } from 'next-auth'
import {FC} from 'react'

interface pageProps {}

const page = async ({}) => {
    const session = await getServerSession(authOptions)
    return <pre> {JSON.stringify(session)}</pre>
}

export default page 