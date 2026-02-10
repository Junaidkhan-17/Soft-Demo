import demo1 from '@/assets/img/demo/demo1.jpg'
import demo2 from '@/assets/img/demo/demo2.jpg'
import demo3 from '@/assets/img/demo/demo3.jpg'
import demo4 from '@/assets/img/demo/demo4.jpg'
import demo5 from '@/assets/img/demo/demo5.jpg'
import demo6 from '@/assets/img/demo/demo6.jpg'
import demo7 from '@/assets/img/demo/demo7.jpg'
import demo8 from '@/assets/img/demo/demo8.jpg'
import demo9 from '@/assets/img/demo/demo9.jpg'
import rtl from '@/assets/img/demo/rtl.png'
import { Link } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaAngleDown, FaArrowRight } from 'react-icons/fa6'

export const menu1 = [
  { image: demo1, path: 'home-1', title: '01. Web Page Builder' },
  { image: demo2, path: 'home-2', title: '02. Time Tracker' },
  { image: demo3, path: 'home-3', title: '03. POS Software' },
  { image: demo4, path: 'home-4', title: '04. Password Manager' },
  { image: demo5, path: 'home-5', title: '05. HR Software', extraStyle: true },
]

export const menu2 = [
  { image: demo6, path: 'home-6', title: '06. Email Marketing' },
  { image: demo7, path: 'home-7', title: '07. Project Management' },
  { image: demo8, path: 'home-8', title: '08. SEO Software' },
  { image: demo9, path: 'home-9', title: '09. Social Media' },
]

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'counters', label: 'Counter' },
  { id: 'work-prosess', label: 'Work Prosess' },
  { id: 'system', label: 'System' },
  { id: 'tes', label: 'Testimonial' },
]

const NavMenu = () => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      let newActiveId = ''

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            newActiveId = section.id
            break
          }
        }
      }

      setActiveId(newActiveId)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <ul id="list-example">
        <li>
          <Link to="#">
            Home <FaAngleDown />
          </Link>
          <div className="tp-submenu">
            <Row>
              <Col lg={12}>
                <div className="all-images-menu">
                  {menu1.map((item, idx) => (
                    <div key={idx} className="homemenu-thumb" style={item.extraStyle ? { margin: '0 0 20px 0' } : {}}>
                      <div className="img1">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="homemenu-btn">
                        <Link className="header-btn1" to={`/${item.path}`}>
                          Multi Page <FaArrowRight />
                        </Link>
                        <div className="space16" />
                        <Link className="header-btn1" to={`/single/${item.path}`} target="_blank">
                          One page <FaArrowRight />
                        </Link>
                      </div>
                      <Link to={`/${item.path}`} className="bottom-heading">
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="all-images-menu">
                  {menu2.map((item, idx) => (
                    <div key={idx} className="homemenu-thumb">
                      <div className="img1">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="homemenu-btn">
                        <Link className="header-btn1" to={`/${item.path}`}>
                          Multi Page <FaArrowRight />
                        </Link>
                        <div className="space16" />
                        <Link className="header-btn1" to={`/single/${item.path}`} target="_blank">
                          One page <FaArrowRight />
                        </Link>
                      </div>
                      <Link to={`/${item.path}`} className="bottom-heading">
                        {item.title}
                      </Link>
                    </div>
                  ))}
                  <div className="homemenu-thumb" style={{ margin: '0 0 20px 0' }}>
                    <div className="img1">
                      <img src={rtl} alt="" />
                    </div>
                    <div className="text">
                      <h2>RTL</h2>
                    </div>
                    <div className="homemenu-btn">
                      <Link className="header-btn1" to="/rtl">
                        Multi Page <FaArrowRight />
                      </Link>
                      <div className="space16" />
                      <Link className="header-btn1" to="/single/rtl" target="_blank">
                        One page <FaArrowRight />
                      </Link>
                    </div>
                    <Link to="/rtl" className="bottom-heading">
                      10. RTL Version
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </li>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <Link className={`list-group-item list-group-item-action ${activeId === id ? 'active' : ''}`} to={`#${id}`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default NavMenu
