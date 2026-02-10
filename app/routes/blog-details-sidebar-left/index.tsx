import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import Details from './components/Details'
import Hero from './components/Hero'
import More from './components/More'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Details />
        <More />
      </MainLayout>
    </>
  )
}

export default index
