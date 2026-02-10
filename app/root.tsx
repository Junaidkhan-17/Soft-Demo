import logo from '@/assets/img/logo/title5.png'
import type { LinksFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from 'react'
import ScrollToTop from './components/BackToTop'

import '@/assets/css/mobile-menu.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import '@/assets/scss/main.scss'

export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/x-icon', href: logo }]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {

  const [hydrated, setHydrated] = useState(false)
  
  useEffect(() => {
    setHydrated(true)
    Aos.init({
      once: true
    })
  }, [])

  if (!hydrated) return null
  
  return (
    <>
      <Outlet />
      <ScrollToTop />
    </>
  )
}
