import TestIcon from '@/assets/img/icons/tes2-icon.png'
import span from '@/assets/img/logo/span9.svg'
import Test2Logo1 from '@/assets/img/logo/tes2-logo1.png'
import Test2Logo2 from '@/assets/img/logo/tes2-logo2.png'
import TestImg from '@/assets/img/testimonial/tes2-img1.png'
import TestImg2 from '@/assets/img/testimonial/tes2-img2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaStar } from 'react-icons/fa6'
import Slider from 'react-slick'

export type TestimonialType = {
  des: string
  image: string
  logo: string
}

export const TestimonialData = [
  {
    des: `"I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared."`,
    image: TestImg,
    logo: Test2Logo1,
  },
  {
    des: `"eSoft has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus"`,
    image: TestImg2,
    logo: Test2Logo2,
  },
  {
    des: `"I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared."`,
    image: TestImg,
    logo: Test2Logo1,
  },
  {
    des: `"eSoft has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus"`,
    image: TestImg2,
    logo: Test2Logo2,
  },
]

const Testimonial = () => {
  const setting = {
    slidesToShow: 2,
    margin: 30,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    loop: true,
    rtl: true,
    centerPadding: '40px',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <>
      <div className="tes9 sp">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center m-auto">
              <div className="heading9">
                <span className="span" data-aos="zoom-in-left" data-aos-duration="700">
                  <img src={span} alt="" /> Testimonials
                </span>
                <h2 className="text-anime-style-3">Why Our Users Love Us</h2>
              </div>
            </Col>
          </Row>

          <div className="space60" />

          <Row>
            <Col lg={12}>
              <Slider {...setting} className="tes2-slider-all-rtl" data-aos="fade-up" data-aos-duration="900">
                {TestimonialData.map((item, idx) => (
                  <div className="px-1">
                    <div key={idx} className="single-slider">
                      <ul className="stars">
                        <li style={{ marginRight: '5px' }}>
                          <FaStar />
                        </li>
                        <li style={{ marginRight: '5px' }}>
                          <FaStar />
                        </li>
                        <li style={{ marginRight: '5px' }}>
                          <FaStar />
                        </li>
                        <li style={{ marginRight: '5px' }}>
                          <FaStar />
                        </li>
                        <li>
                          <FaStar />
                        </li>
                      </ul>

                      <div className="icon">
                        <img src={TestIcon} alt="" />
                      </div>

                      <p>{item.des}</p>

                      <div className="single-slider-bottom">
                        <div className="headdding-area">
                          <div className="image">
                            <img src={item.image} alt="" />
                          </div>
                          <div className="headding">
                            <h5>
                              <Link to="">Pat Cummins</Link>
                            </h5>
                            <p>Ceo Biosynthesis</p>
                          </div>
                        </div>
                        <div className="logo">
                          <img src={item.logo} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Testimonial
