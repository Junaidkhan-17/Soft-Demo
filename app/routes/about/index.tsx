import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import About from './components/About'
import About2 from './components/About2'
import About3 from './components/About3'
import Brands from './components/Brands'
import Hero from './components/Hero'
import Innovation from './components/Innovation'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const about = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <About />
        <About2 />
        <About3 />
        <Innovation />
        <Brands />
      </MainLayout>
    </>
  )
}

export default about
