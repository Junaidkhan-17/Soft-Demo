import 'glightbox/dist/css/glightbox.min.css'
import { ReactNode, useEffect } from 'react'

type PropsType = {
  children: ReactNode
}

const GlightBox = ({ children }: PropsType) => {
  useEffect(() => {
    import('glightbox').then(({ default: GLightbox }) => {
      const instance = GLightbox({
        openEffect: 'fade',
        closeEffect: 'fade',
      })

      return () => instance.destroy()
    })
  }, [])

  return <>{children}</>
}
export default GlightBox
