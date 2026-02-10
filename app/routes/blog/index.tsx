import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import Innovation from '../about/components/Innovation'
import Blog from './components/Blog'
import Blog2 from './components/Blog2'
import Hero from './components/Hero'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Blog />
        <Innovation />
        <Blog2 />
      </MainLayout>
    </>
  )
}

export default index
