import Logo6 from '@/assets/img/logo/header-logo2.png'
import useScrollEvent from '@/hooks/useScrollEvent'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'
import MobileTop from './MobileTop'
import NavMenu from './NavMenu'

const Navbar = () => {
  const { scrollY } = useScrollEvent()

  return (
    <>
      <header>
        <div className={`header-area header-area9 header-area-all d-none d-lg-block ${scrollY > 100 && 'sticky'}`} id="header">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="header-elements">
                  <div className="site-logo home1-site-logo">
                    <Link to="/home-1">
                      <img src={Logo6} alt="" />
                    </Link>
                  </div>
                  <div className="main-menu-ex main-menu-ex1">
                    <NavMenu />
                  </div>
                  <div className="header-buttons">
                    <Link to="#" className="theme-btn15">
                      Get quip free now
                      <span>
                        <FaArrowRight />
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

export default Navbar
