import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import Hero from './components/Hero'
import Pricing from './components/Pricing'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Pricing />
      </MainLayout>
    </>
  )
}

export default index
