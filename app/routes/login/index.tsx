import { MetaFunction } from '@remix-run/node'
import Login from './components/Login'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const page = () => {
  return (
    <>
      <Login />
    </>
  )
}

export default page
