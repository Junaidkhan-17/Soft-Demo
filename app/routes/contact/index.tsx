import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import Contact from './components/Contact'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const page = () => {
  return (
    <>
      <MainLayout>
        <Contact />
      </MainLayout>
    </>
  )
}

export default page
