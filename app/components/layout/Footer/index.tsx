import footerIcon1 from '@/assets/img/icons/footer-icon1.png'
import footerIcon2 from '@/assets/img/icons/footer-icon2.png'
import footerIcon3 from '@/assets/img/icons/footer-icon3.png'
import webdockLogo from '@/assets/img/logo/webdockLogo.jpeg'
import Shape1 from '@/assets/img/shapes/footer2-shape.png'
import Shape2 from '@/assets/img/shapes/footer2-shape2.png'
import { currentYear } from '@/components/CurrentYear'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'

type FooterLink = {
  title: string
  links: {
    label: string
  }[]
}

export const footerData: FooterLink[] = [
  {
    title: 'Product',
    links: [{ label: 'Pricing' }, { label: 'Integration' }, { label: 'Features' }, { label: 'Templates' }, { label: 'Changelog' }],
  },
  {
    title: 'Support',
    links: [{ label: 'On-boarding' }, { label: 'Help center' }, { label: 'Contact us' }, { label: 'Experts' }, { label: 'Status' }],
  },
  {
    title: 'Resources',
    links: [{ label: 'Community' }, { label: 'Affiliates' }, { label: 'Partnerships' }, { label: 'Perks & Benefits' }, { label: 'Api docs' }],
  },
  {
    title: 'Company',
    links: [{ label: 'About' }, { label: 'Our blog' }, { label: 'In the press' }, { label: 'Brand assets' }, { label: 'Work with us' }],
  },
  {
    title: 'Download',
    links: [{ label: 'iPhone & iPad' }, { label: 'Android' }, { label: 'MacOS' }, { label: 'Window' }],
  },
]

const Footer = () => {
  return (
    <>
      <div className="footer2 _relative">
        <Container>
          <Row>
            <div className="footer-icon-box-all">
              <div className="footer-icon-box">
                <div className="icon">
                  <img src={footerIcon1} alt="" />
                </div>
                <div className="headding">
                  <p>Free training & 24-hours</p>
                </div>
              </div>
              <div className="footer-icon-box">
                <div className="icon">
                  <img src={footerIcon2} alt="" />
                </div>
                <div className="headding">
                  <p>Serious about security & privacy</p>
                </div>
              </div>
              <div className="footer-icon-box">
                <div className="icon">
                  <img src={footerIcon3} alt="" />
                </div>
                <div className="headding">
                  <p>Highest levels of uptime the last 12 months</p>
                </div>
              </div>
            </div>
          </Row>
          <div className="space50" />
          <Row>
            {footerData.map((section, idx) => (
              <Col lg md={6} xs={12} key={idx}>
                <div className="single-footer-items">
                  <h3>{section.title}</h3>
                  <ul className="menu-list">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link to="">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
            <Col lg={3} md={6} xs={12}>
              <div className="single-footer-items">
                <h3>Product</h3>
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
                    <img src={webdockLogo} alt="" />
                  </Link>
                </div>
              </Col>
              <Col md={7}>
                <div className="coppyright text-right">
                  <Link to="">@ {currentYear} eSoft</Link>
                  <Link to="">Security</Link>
                  <Link to="">Your Privacy</Link>
                  <Link to="">Terms</Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <img className="footer-shape" src={Shape1} alt="" />
        <img className="footer-shape2" src={Shape2} alt="" />
      </div>
    </>
  )
}

export default Footer
