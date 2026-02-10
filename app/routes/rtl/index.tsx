import BasicLayout from '@/components/layout/BasicLayout'
import Footer from '@/components/layout/Footer'
import { MetaFunction } from '@remix-run/node'
import Benefit from './components/Benefit'
import Counter from './components/Counter'
import CTA from './components/CTA'
import Header from './components/Header'
import Hero from './components/Hero'
import Process from './components/Process'
import Solution from './components/Solution'
import Testimonial from './components/Testimonial'
import Work from './components/Work'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const rtl = () => {
  return (
    <>
      <BasicLayout>
        <Header />
        <Hero />
        <Work />
        <Counter />
        <Process />
        <Benefit />
        <Solution />
        <Testimonial />
        <CTA />
        <Footer />
      </BasicLayout>
    </>
  )
}

export default rtl
