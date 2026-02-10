import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import About3 from '../about/components/About3'
import Innovation from '../about/components/Innovation'
import Feature from './components/Feature'
import Hero from './components/Hero'
import Stiky from './components/Stiky'
import Work from './components/Work'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <MainLayout>
        <div className="unic-body">
          <Hero />
          <Stiky />
          <Work />
          <Innovation />
          <Feature />
          <About3 />
        </div>
      </MainLayout>
    </>
  )
}

export default index
