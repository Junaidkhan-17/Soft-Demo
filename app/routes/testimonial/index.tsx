import MainLayout from '@/components/layout/MainLayout'
import { MetaFunction } from '@remix-run/node'
import Testimonial from './components/Testimonial'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const page = () => {
  return (
    <>
      <MainLayout>
        <Testimonial />
      </MainLayout>
    </>
  )
}

export default page
