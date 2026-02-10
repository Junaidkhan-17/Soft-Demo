import { MetaFunction } from '@remix-run/node'
import Account from './components/Account'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <Account />
    </>
  )
}

export default index
