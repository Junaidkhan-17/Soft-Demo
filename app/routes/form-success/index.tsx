import { MetaFunction } from '@remix-run/node'
import FormSuccess from './components/FormSuccess'

export const meta: MetaFunction = () => {
  return [{ title: 'Web Page Builder' }]
}

const index = () => {
  return (
    <>
      <FormSuccess />
    </>
  )
}

export default index


