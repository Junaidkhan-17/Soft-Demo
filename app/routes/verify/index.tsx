import { MetaFunction } from '@remix-run/node'
import Verify from './components/Verify'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <Verify />
    </>
  )
}

export default index


