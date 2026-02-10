//import Logo1 from '@/assets/img/logo/tes2-slider2-logo1.png'
//import Logo2 from '@/assets/img/logo/tes2-slider2-logo2.png'
//import Logo3 from '@/assets/img/logo/tes2-slider2-logo3.png'
//import Logo4 from '@/assets/img/logo/tes2-slider2-logo4.png'
//import Logo5 from '@/assets/img/logo/tes2-slider2-logo5.png'
//import Tes1 from '@/assets/img/testimonial/tes1-big-img.png'
import Pagination from '@/components/Pagination'
import { Link } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa6'
import Slider from 'react-slick'
import Blog from './Blog'

type testimonialType = {
  image: string
}

type Testimonial2Type = {
  id: number
  name: string
  role: string
  company: string
  message: string
  image: string
}

const TestimonialData: testimonialType[] = [
  { image: '1'},//Logo1 },
  { image: '2'},//Logo2 },
  { image: '3'},//Logo3 },
  { image: '4'},//Logo4 },
  { image: '5'},//Logo5 },
  { image: '6'},//Logo1 },
  { image: '7'},//Logo2 },
  { image: '8'},//Logo3 },
  { image: '9'},//Logo4 },
  { image: '10'},//Logo5 },
]

const sliderData: Testimonial2Type[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: 'Oliver Grioud',
  role: 'CEO',
  company: 'Lava Ltd',
  message: `“The team at WebDock Studio not only delivered what was promised but also provided valuable insights that added immense value to our project, on your needs an Based on your needs, we devise. The support team is exceptional! They've been responsive and helpful at every step.”`,
  image: '1',//Tes1,
}))

const Testimonial = () => {
  const [nav1, setNav1] = useState<Slider>()
  const [nav2, setNav2] = useState<Slider>()

  const sliderRef1 = useRef<Slider | null>(null)
  const sliderRef2 = useRef<Slider | null>(null)

  useEffect(() => {
    setNav1(sliderRef1.current!)
    setNav2(sliderRef2.current!)
  }, [])

  const setting1 = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    loop: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
        },
      },
    ],
  }

  const setting2 = {
    margin: '30',
    slidesToShow: 1,
    arrows: false,
    centerMode: true,
    loop: true,
    draggable: true,
    fade: true,
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
      <div className="testimonial-page sp">
        <Container>
          <Row>
            <Col lg={7} className="m-auto text-center">
              <div className="common-main-headding">
                <h1>Client Feedback</h1>
                <p>
                  At Webdock Studio, we value your inquiries and are here to provide the support you need. Whether you're looking for more information an about
                  our cutting.
                </p>
              </div>
            </Col>
          </Row>

          <div className="space60" />
          <Row>
            <Col lg={12}>
              <div className="testimonial-slider-all">
                <div className="testimonial-single-slider">
                  <Slider ref={sliderRef1} asNavFor={nav2} {...setting1} className="tes1-brads-slider">
                    {TestimonialData.map((item, idx) => (
                      <div key={idx} className="single-logo">
                        {/*<img src={item.image} alt="" />*/}
                      </div>
                    ))}
                  </Slider>
                  <Slider ref={sliderRef2} asNavFor={nav1} {...setting2} className="tes1-big-slider">
                    {sliderData.map((item, idx) => (
                      <div key={idx} className="single-slider">
                        <Row>
                          <Col lg={8}>
                            <ul className="stars">
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                            </ul>
                            <p className="pera">{item.message}</p>

                            <div className="bottom-headding">
                              <h4>
                                <Link to="">
                                  {item.name}/{item.role}, {item.company}
                                </Link>
                              </h4>
                              <p>Read More Testimonials Feedback</p>
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div className="image">
                              {/*<img src={item.image} alt={item.name} />*/}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Slider>

                  <div className="testimonial-arrows">
                    <button className="testimonial-prev-arrow" onClick={() => sliderRef2.current?.slickPrev()}>
                      <FaArrowLeft />
                    </button>
                    <button className="testimonial-next-arrow" onClick={() => sliderRef2.current?.slickNext()}>
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="space60" />
          <Blog />
          <div className="space50" />
          <Pagination />
        </Container>
      </div>
    </>
  )
}

export default Testimonial
