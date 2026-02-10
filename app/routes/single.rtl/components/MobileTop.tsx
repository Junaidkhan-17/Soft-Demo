import HeaderLogo1 from '@/assets/img/logo/header-logo1.png';
import HeaderLogo from '@/assets/img/logo/header-logo2.png';
import MobileMenu from '@/components/layout/Topbar/components/MobileMenu';
import useToggle from '@/hooks/useToggle';
import { Link } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { Col, Container } from 'react-bootstrap';
import {
  FaArrowRight,
  FaBarsStaggered,
  FaInstagram,
  FaLinkedinIn,
  FaRegEnvelope,
  FaXmark,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { FiPhone } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';

const MobileTop = () => {
  const { isOpen, toggle } = useToggle();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggle]);

  return (
    <div>
      <div className="mobile-header mobile-header3 d-block d-lg-none ">
        <Container fluid>
          <Col xs={12}>
            <div className="mobile-header-elements">
              <div className="mobile-logo">
                <Link to="/home-1">
                  <img src={HeaderLogo} alt="" />
                </Link>
              </div>
              <div onClick={toggle} className="mobile-nav-icon">
                <FaBarsStaggered />
              </div>
            </div>
          </Col>
        </Container>
      </div>

      <div
        ref={sidebarRef}
        className={`mobile-sidebar mobile-sidebar4  d-block d-lg-none ${isOpen ? 'mobile-menu-active' : ''}`}
      >
        <div className="logo-m">
          <Link to="/home-1">
            <img src={HeaderLogo1} alt="" />
          </Link>
        </div>
        <div onClick={toggle} className="menu-close">
          <FaXmark />
        </div>
        <div className="mobile-nav">
          <MobileMenu />
          <Link className="sidebar1-btn" to="/contact">
            <span>Book a Consultation</span>
            <span className="arrow">
              <FaArrowRight />
            </span>
          </Link>
          <div className="contact-infos">
            <h3>Contact Info</h3>
            <div className="box">
              <div className="icon">
                <span>
                  <FiPhone />
                </span>
              </div>
              <div className="pera">
                <Link to="tel:921-888-0022">921-888-0022</Link>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <span>
                  <FaRegEnvelope />
                </span>
              </div>
              <div className="pera">
                <Link to="mailto:example@visafast.com">example@visafast.com</Link>
              </div>
            </div>
          </div>
          <div className="contact-infos">
            <h3>Our Location</h3>
            <div className="box">
              <div className="icon">
                <span>
                  <SlLocationPin />
                </span>
              </div>
              <div className="pera">
                <Link to="">
                  55 East Birchwood Ave.Brooklyn, <br />
                  New York 11201,United States
                </Link>
              </div>
            </div>
          </div>

          <div className="contact-infos">
            <h3>Our Location</h3>
            <ul className="icon-list">
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
        </div>
      </div>
    </div>
  );
};

export default MobileTop;
