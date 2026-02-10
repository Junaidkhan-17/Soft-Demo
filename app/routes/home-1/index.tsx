import BasicLayout from '@/components/layout/BasicLayout'
import { MetaFunction } from '@remix-run/node'
import Brands from './components/Brands'
import Counter from './components/Counter'
import CTA from './components/CTA'
import Editing from './components/Editing'
import Faq from './components/Faq'
import Feature from './components/Feature'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar1 from './components/Navbar1'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const home1 = () => {
  return (
    <>
      <BasicLayout>
        <Navbar1 />
        <Hero />
        <Counter />
        <Editing />
        <Feature />
        <Brands />
        <Faq />
        <CTA />
        <Footer />
      </BasicLayout>
    </>
  )
}

export default home1
