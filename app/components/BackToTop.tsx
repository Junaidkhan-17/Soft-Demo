import { useLocation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

const ScrollToTop: React.FC = () => {
  const [progress, setProgress] = useState<number>(0)
  const location = useLocation()
  const pathname = location.pathname

  const isWhiteVariant = pathname === '/home-7' || pathname === '/single/home-7'

  // List of paths where scroll-to-top should be hidden
  const hiddenPaths: string[] = ['/error', '/account', '/login', '/forgot', '/reset', '/verify', '/form-success']

  const shouldHideButton = hiddenPaths.some((path) => pathname?.startsWith(path))

  useEffect(() => {
    if (shouldHideButton) return

    const handleScroll = (): void => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercentage = (scrollTop / docHeight) * 100
      setProgress(scrollPercentage)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldHideButton])

  const goToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (shouldHideButton) return null

  return (
    <div className={`progress-wrap ${progress > 4 ? 'active-progress' : ''} ${isWhiteVariant ? 'white-scroll-btn' : ''}`} onClick={goToTop}>
      <div className="position-relative">
        <svg className="progress-circle position-relative z-10 svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" strokeDasharray="307" strokeDashoffset={307 - (progress / 100) * 307} />
        </svg>
        <div className="position-absolute top-50 start-50 z-20 translate-middle arrow">
          <FaArrowUp size={18} />
        </div>
      </div>
    </div>
  )
}

export default ScrollToTop
