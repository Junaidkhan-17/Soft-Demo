import { MetaFunction } from '@remix-run/node'
import Forgot from './components/Forgot'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <Forgot />
    </>
  )
}

export default index
