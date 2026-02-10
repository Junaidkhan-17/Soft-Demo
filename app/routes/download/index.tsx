import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import Download from './components/Download'
import Hero from './components/Hero'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Download />
      </MainLayout>
    </>
  )
}

export default index
