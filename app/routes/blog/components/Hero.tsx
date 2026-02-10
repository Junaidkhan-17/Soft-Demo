//import shape1 from '@/assets/img/shapes/common-hero-shape1.png'
//import shape3 from '@/assets/img/shapes/common-hero-shape3.png'
import { Link } from '@remix-run/react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const Hero = () => {
  useEffect(() => {
    document.body.classList.add('body2', 'body')
    return () => {
      document.body.classList.remove('body2', 'body')
    }
  }, [])

  return (
    <>
      <div className="pages-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="main-headding">
                <h1>News & Articles</h1>
                <p>
                  Revolutionise & email marketing strategy with cutting-edge <br />
                  software designed to elevate your campaigns, our intuitive.
                </p>
                <div className="space30" />
                <div className="hero-btns">
                  <Link to="/account">
                    <span className="theme-btn2">Get Started Now</span>
                  </Link>
                  <Link to="/account">
                    <span className="theme-btn3">Try For Free Now</span>
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={1}></Col>
            <Col lg={5}>
              <form action="#">
                <div className="search-area">
                  <div className="input">
                    <input type="text" placeholder="Search for articles....." />
                  </div>
                  <div className="button">
                    <button type="submit">
                      <FaMagnifyingGlass />
                    </button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
        {/*<img className="hero-shape1" src={shape1} alt="Shape 1" />*/}
        {/*<img className="hero-shape3" src={shape3} alt="Shape 3" />*/}
      </div>
    </>
  )
}

export default Hero
