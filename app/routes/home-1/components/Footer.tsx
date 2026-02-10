import FooterLogo from '@/assets/img/logo/footer-logo6.png'
import { currentYear } from '@/components/CurrentYear'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'

export type menu = {
  name: string
}
export type ListType = {
  name: string
}

export const menuData: menu[] = [
  { name: 'Community' },
  { name: 'Affiliates' },
  { name: 'Partnerships' },
  { name: 'Perks & Benefits' },
  { name: 'Api docs' },
]

export const ListData: ListType[] = [{ name: 'iPhone & iPad' }, { name: 'Android' }, { name: 'MacOS' }, { name: 'Window' }]

const Footer = () => {
  return (
    <div className="footer6 _relative">
      <Container className="bg">
        <Row>
          <Col lg={5}>
            <div className="subscribe-area">
              <h5>Subscribe to our newsletter</h5>
              <p>WebDock Studio has exceeded our expectations every way. The ease with & which Search Engine</p>
              <div className="input-area">
                <input type="email" placeholder="Email Address" />
                <div className="button">
                  <button className="theme-btn9">
                    <span className="tb8">
                      Get Started Now
                      <span className="arrow">
                        <FaArrowRight />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col lg md={6} xs={6}>
            <div className="single-footer-items">
              <h3>Resources</h3>
              <ul className="menu-list">
                {menuData.map((item, idx) => (
                  <li key={idx}>
                    <Link to="">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col lg md={6} xs={6}>
            <div className="single-footer-items">
              <h3>Download</h3>
              <ul className="menu-list">
                {ListData.map((item, idx) => (
                  <li key={idx}>
                    <Link to="">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col lg={3} md={6} xs={12}>
            <div className="single-footer-items">
              <h3>Social Links</h3>
              <ul className="social-icons">
                <li>
                  <Link to="">
                    <FaLinkedinIn />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FaYoutube />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FaInstagram />
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="space40" />
        <div className="copyright-area">
          <Row className="align-items-center">
            <Col md={5}>
              <div className="logo">
                <Link to="/home-1">
                  <img src={FooterLogo} alt="" />
                </Link>
              </div>
            </Col>
            <Col md={7}>
              <div className="coppyright text-right">
                <Link to="">@{currentYear} WebDock Studio</Link>
                <Link to="">Security</Link>
                <Link to="">Your Privacy</Link>
                <Link to="">Terms</Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Footer
