import Button from '../components/ui/Button'
import { db } from '../lib/db'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default async function  Home() {

  await db.set('Hello', 'World')
  
  return <Button>Hello Mazafaka</Button>
}
