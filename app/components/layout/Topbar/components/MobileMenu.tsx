import { Link } from '@remix-run/react'
import { useState } from 'react'

type OpenSubmenus = {
  [key: number]: boolean
}

const MobileMenu = () => {
  const [openSubMenus, setOpenSubMenus] = useState<OpenSubmenus>({})

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const getSubmenuStyle = (index: number) => ({
    transform: openSubMenus[index] ? 'scaleY(1)' : 'scaleY(0)',
    opacity: openSubMenus[index] ? 1 : 0,
    transformOrigin: 'top',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    display: openSubMenus[index] ? 'block' : 'none',
  })

  const displayNames: { [key: string]: string } = {
    account: 'Create Account',
    login: 'Login',
    forgot: 'Forgot',
    reset: 'Reset',
    verify: 'Verify Email',
    'form-success': 'Success',
  }

  return (
    <div className="mobile-nav hash-has-sub">
      <ul>
        <li className="has-dropdown hash-has-sub">
          <span className={`submenu-button ${openSubMenus[1] ? 'submenu-opened' : ''}`} onClick={() => handleSubMenuToggle(1)}>
            <em></em>
          </span>
          <Link to="">Home</Link>
          <ul style={getSubmenuStyle(1)} className="ms-3">
            <li className="has-dropdown hash-has-sub">
              <span className={`submenu-button ${openSubMenus[2] ? 'submenu-opened' : ''}`} onClick={() => handleSubMenuToggle(2)}>
                <em></em>
              </span>
              <Link to="">Multipage</Link>

              <ul style={getSubmenuStyle(2)} className="ms-3">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'rtl'].map((v) => (
                  <li key={v}>
                    <Link to={`/${v === 'rtl' ? 'rtl' : `home-${v}`}`}>{v === 'rtl' ? 'RTL' : `Home ${v}`}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="has-dropdown hash-has-sub">
              <span className={`submenu-button ${openSubMenus[3] ? 'submenu-opened' : ''}`} onClick={() => handleSubMenuToggle(3)}>
                <em></em>
              </span>

              <Link to="">Landing Page</Link>
              <ul style={getSubmenuStyle(3)} className="ms-3">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'rtl'].map((v) => (
                  <li key={v}>
                    <Link to={`/single/${v === 'rtl' ? 'rtl' : `home-${v}`}`}>{v === 'rtl' ? 'RTL' : `Home ${v}`}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li className="has-dropdown hash-has-sub">
          <span className={`submenu-button ${openSubMenus[4] ? 'submenu-opened' : ''}`} onClick={() => handleSubMenuToggle(4)}>
            <em></em>
          </span>
          <Link to="">Pages</Link>
          <ul style={getSubmenuStyle(4)} className="ms-3">
            {['contact', 'features', 'testimonial', 'pricing', 'download', 'error'].map((page) => (
              <li key={page}>
                <Link to={`/${page}`}>{page.charAt(0).toUpperCase() + page.slice(1)}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="has-dropdown hash-has-sub">
          <span className={`submenu-button ${openSubMenus[5] ? 'submenu-opened' : ''}`} onClick={() => handleSubMenuToggle(5)}>
            <em></em>
          </span>
          <Link to="">Blog</Link>
          <ul style={getSubmenuStyle(5)} className="ms-3">
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/blog-details-sidebar-left">Details Left</Link>
            </li>
            <li>
              <Link to="/blog-details-sidebar-right">Details Right</Link>
            </li>
            <li>
              <Link to="/blog-details">Blog Details</Link>
            </li>
          </ul>
        </li>
        <li className="has-dropdown hash-has-sub">
          <span className={`submenu-button ${openSubMenus[6] ? 'submenu-opened' : ''}`} onClick={() => handleSubMenuToggle(6)}>
            <em></em>
          </span>
          <Link to="">Account</Link>
          <ul style={getSubmenuStyle(6)} className="ms-3">
            {['account', 'login', 'forgot', 'reset', 'verify', 'form-success'].map((page) => (
              <li key={page}>
                <Link to={`/${page}`}>{displayNames[page] || page.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default MobileMenu
