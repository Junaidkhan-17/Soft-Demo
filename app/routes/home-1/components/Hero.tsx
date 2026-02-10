//import hero6Img1 from '@/assets/img/hero/hero6-img1.png'
//import hero6Img2 from '@/assets/img/hero/hero6-img2.png'
//import hero6Img3 from '@/assets/img/hero/hero6-img3.png'
import MainSpan from '@/assets/img/icons/main-span6.png'
import GlightBox from '@/components/GlightBox'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

const Hero = () => {
  return (
    <div className="hero-area6">
      <Container>
        <Row className="align-items-center">
          <Col lg={5}>
            <div className="main-heading">
              <span className="span" data-aos="fade-left" data-aos-duration="700">
                <img src={MainSpan} alt="" /> Top Choice For Websites Worldwide
              </span>
              <h1 className="text-anime-style-3">Build Your Website With WebDocks Studio</h1>
              <div className="space16" />
              <p data-aos="fade-right" data-aos-duration="700">
                WebDock takes the Customizer to the next level so you can customize every aspect your website single interface.
              </p>
              <div className="space30" />
              <div className="buttons" data-aos="fade-right" data-aos-duration="900">
                <Link to="/account" className="theme-btn8">
                  <span className="tb8">
                    Get Started Now
                    <span className="arrow">
                      <FaArrowRight />
                    </span>
                  </span>
                </Link>
                <div className="video-action-btn1 popup-youtube">
                  <div className="">
                    {/*<GlightBox>
                      <a
                        id="play-video"
                        className="glightbox video-play-button play-btn glightbox-video"
                        href="https://www.youtube.com/watch?v=Y8XpQpW5OVY">
                        <span></span>
                      </a>
                    </GlightBox>*/}
                  </div>
                  <div className="video-btn-pera">
                    <p>Play Video</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <div className="images-all" data-aos="zoom-out" data-aos-duration="800">
              <div className="image1">
                {/*<img src={hero6Img1} alt="" />*/}
              </div>
              <div className="image2 animate1">
                {/*<img src={hero6Img2} alt="" />*/}
              </div>
              <div className="image3 shape-animaiton2">
               {/*} <img src={hero6Img3} alt="" />*/}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
