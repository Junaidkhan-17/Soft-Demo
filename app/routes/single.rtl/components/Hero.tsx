import hero1 from '@/assets/img/hero/hero9-img1.png'
import hero2 from '@/assets/img/hero/hero9-img2.png'
import hero3 from '@/assets/img/hero/hero9-img3.png'
import hero4 from '@/assets/img/hero/hero9-img4.png'
import hero5 from '@/assets/img/hero/hero9-img5.png'
import heroMain from '@/assets/img/hero/hero9-main.png'
import spanImg from '@/assets/img/logo/span9.svg'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

type HeroImage = {
  className: string
  image: string
}

const heroImages: HeroImage[] = [
  { className: 'image1', image: hero1 },
  { className: 'image2 shape-animaiton3', image: hero2 },
  { className: 'image3 shape-animaiton2', image: hero3 },
  { className: 'image4 animate1', image: hero4 },
  { className: 'image5', image: hero5 },
  { className: 'main-img', image: heroMain },
]

const Hero = () => {
  useEffect(() => {
    document.body.classList.add('body', 'rtl-body')
    document.documentElement.setAttribute('dir', 'rtl')
    return () => {
      document.body.classList.remove('body', 'rtl-body')
      document.documentElement.removeAttribute('dir')
    }
  }, [])

  return (
    <div className="hero-area9">
      <Container>
        <Row className="align-items-center">
          <Col lg={5}>
            <div className="main-heading">
              <span className="span" data-aos="zoom-in-left" data-aos-duration="700">
                <img src={spanImg} alt="Span" /> Keep track of your employee data
              </span>
              <h1 className="text-anime-style-3">Effortless Employee Management For A Growing Businesses</h1>
              <div className="space16" />
              <p>Managing your people is easy with Quip HR’s user-friendly and mobile-ready HR software, discover key features via.</p>
              <div className="space30" />
              <div className="buttons">
                <Link to="/account" className="theme-btn15">
                  Get quip free now
                  <span>
                    <FaArrowRight />
                  </span>
                </Link>
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <div className="main-images">
              {heroImages.map((item, idx) => (
                <div key={idx} className={item.className}>
                  <img src={item.image} alt={`Hero image ${idx + 1}`} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
