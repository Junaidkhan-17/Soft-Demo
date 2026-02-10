import { MetaFunction } from '@remix-run/node'
import Reset from './components/Reset'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <Reset />
    </>
  )
}

export default index
