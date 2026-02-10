//import Logo from '@/assets/img/logo/brand-logo3.png'
import { Link } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import VanillaTilt from 'vanilla-tilt'

const Brands = () => {
  const tiltRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 20,
        speed: 500,
        glare: true,
        'max-glare': 0.2,
        scale: 1.05,
        perspective: 1000,
      })
    }
  }, [])

  return (
    <div className="brand-area3 sp">
      <Container>
        <Row>
          <Col lg={6} className="m-auto text-center">
            <div className="headding2">
              <h2>Connect entire workflows</h2>
              <div className="space10" />
              <p>Join a growing community of satisfied customers! Over 4K+ users have already chosen eSoft for its reliability and performance.</p>
              <div className="space20" />
              <Link to="/features" className="theme-btn2">
                View All Integrations
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <div
            ref={tiltRef}
            className="big-logo"
            data-tilt
            data-tilt-full-page-listening
            data-tilt-perspective="1000"
            style={{
              display: 'inline-block',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              transition: 'transform 0.3s ease',
            }}>
            {/*<img src={Logo} alt="Brand Logo" />*/}
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Brands
