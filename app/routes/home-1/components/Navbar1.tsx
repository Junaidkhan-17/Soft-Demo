import Webdock from '@/assets/img/logo/webdockLogo.jpeg'
import Menu from '@/components/layout/Topbar/components/Menu'
import useScrollEvent from '@/hooks/useScrollEvent'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'
import MobileTop from './MobileTop'

const Navbar1 = () => {
  const { scrollY } = useScrollEvent()

  return (
    <>
      <header>
        <div className={`header-area header-area6 header-area-all d-none d-lg-block ${scrollY > 100 && 'sticky'}`} id="header">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="header-elements">
                  <div className="site-logo home1-site-logo">
                    <Link to="/home-1">
                      <img src={Webdock} alt="" />
                    </Link>
                  </div>
                  <div className="main-menu-ex main-menu-ex1">
                    <Menu />
                  </div>
                  <div className="header4-buttons">
                    <Link to="/account" className="theme-btn8">
                      <span className="tb8">
                        Get Started Now
                        <span className="arrow">
                          <FaArrowRight />
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
      <MobileTop />
    </>
  )
}

export default Navbar1
