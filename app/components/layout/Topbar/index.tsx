import Logo2 from '@/assets/img/logo/header-logo2.png'
import useScrollEvent from '@/hooks/useScrollEvent'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import Menu from './components/Menu'
import MobileTop from './components/MobileTop'

const Navbar = () => {
  const { scrollY } = useScrollEvent()

  return (
    <>
      <header>
        <div className={`header-area header-area2 header-area-all d-none d-lg-block ${scrollY > 100 && 'sticky'}`} id="header">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="header-elements">
                  <div className="site-logo home1-site-logo">
                    <Link to="/home-1">
                      <img src={Logo2} alt="" />
                    </Link>
                  </div>
                  <div className="main-menu-ex main-menu-ex1">
                    <Menu />
                  </div>
                  <div className="header2-buttons">
                    <Link to="/login" className="login-btn">
                      Log In
                    </Link>
                    <Link to="/account" className="theme-btn2">
                      Sign Up For Free
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
