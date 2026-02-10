import { ChildrenType } from '@/types/component-props'
import { Suspense, useEffect } from 'react'
import Loader from '../Loader'

const BasicLayout = ({ children }: ChildrenType) => {

  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  )
}

export default BasicLayout
