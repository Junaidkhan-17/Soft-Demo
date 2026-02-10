import Logo from '@/assets/img/logo/header-logo2.png'
import Menu from '@/components/layout/Topbar/components/Menu'
import useScrollEvent from '@/hooks/useScrollEvent'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'
import MobileTop from './MobileTop'

const Header = () => {
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
                      <img src={Logo} alt="" />
                    </Link>
                  </div>
                  <div className="main-menu-ex main-menu-ex1">
                    <Menu />
                  </div>
                  <div className="header-buttons">
                    <Link to="/account" className="theme-btn15">
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

export default Header
