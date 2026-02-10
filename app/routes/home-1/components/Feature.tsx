//import SpanImg6 from '@/assets/img/icons/span-image6.png'
//import features6Img1 from '@/assets/img/others/features6-img1.png'
//import features6Img2 from '@/assets/img/others/features6-img2.png'
//import features6Img3 from '@/assets/img/others/features6-img3.png'
//import features6Img4 from '@/assets/img/others/features6-img4.png'
//import features6Img5 from '@/assets/img/others/features6-img5.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

export type FeatureItem = {
  id: number
  subtitle: string
  title: string
  description: string
  //image: string
  animation: 'fade-left' | 'fade-right'
  startDelay: number
  duration: number
  descriptionDelay: number
  exitDelay: number
}

export const featuresData: FeatureItem[] = [
  {
    id: 1,
    subtitle: 'Page Builder',
    title: 'Front/Back End Page Builder',
    description:
      'Build a responsive website and manage your content easily with intuitive WordPress Front end editor. No programming knowledge required – create stunning and beautiful pages with award-winning drag and drop builder.',
    //image: features6Img1,
    animation: 'fade-left',
    startDelay: 800,
    duration: 700,
    descriptionDelay: 900,
    exitDelay: 900,
  },
  {
    id: 2,
    subtitle: 'Any Color Choose',
    title: 'Roll Your Own Colour Theme',
    description:
      'Built-in Skin Builder: Use the built-in skin builder to tweak WebDock Studio Page Builder design options and elements styling, making a perfect match with your brand identity.',
    //image: features6Img2,
    animation: 'fade-right',
    startDelay: 700,
    duration: 900,
    descriptionDelay: 1100,
    exitDelay: 1000,
  },
  {
    id: 3,
    subtitle: 'Any Theme Design',
    title: 'For Any WordPress Theme',
    description:
      'Every website design needs to be unique. With WPBakery Page Builder, you can work with any WordPress theme of your choice. This powerful tool allows you to create responsive an stunning layouts without any coding knowledge.',
    //image: features6Img3,
    animation: 'fade-left',
    startDelay: 1000,
    duration: 700,
    descriptionDelay: 900,
    exitDelay: 1000,
  },
  {
    id: 4,
    subtitle: 'Template Library',
    title: 'WebDock Studio Template Library',
    description:
      'Access premium class templates via the online Template Library and build your pages in seconds. Download any template you like without any restrictions. Template Library gets constantly updated with new templates.',
    //image: features6Img4,
    animation: 'fade-right',
    startDelay: 700,
    duration: 900,
    descriptionDelay: 1000,
    exitDelay: 800,
  },
  {
    id: 5,
    subtitle: 'any layout available',
    title: 'Any Mobile/Laptop Layouts',
    description:
      'WPBakery Page Builder ensures your website looks perfect on every device, whether it’s a mobile phone, tablet, laptop. The responsive design capabilities allow you create layouts.',
    //image: features6Img5,
    animation: 'fade-left',
    startDelay: 1000,
    duration: 700,
    descriptionDelay: 900,
    exitDelay: 1000,
  },
]

const Feature = () => {
  return (
    <div className="features6 sp" id="feature">
      <Container>
        <Row>
          <Col lg={6} className="m-auto text-center">
            <div className="heading6">
              <span className="title">
                {/*<img src={SpanImg6} alt="Section Icon" />*/}
              </span>
              <h2 className="text-anime-style-3">WebDocks Studio Features</h2>
            </div>
          </Col>
        </Row>
        {featuresData.map((item, index) => (
          <Row className="align-items-center" key={item.id}>
            {index % 2 === 0 ? (
              <>
                <Col lg={6}>
                  <div className="main-image right60" data-aos="zoom-out" data-aos-duration={item.startDelay}>
                    {/*<img src={item.image} alt={item.title} />*/}
                  </div>
                </Col>
                <Col xs={1}></Col>
                <Col lg={5}>
                  <div className="heading6 features-heading">
                    <span className="span3" data-aos={item.animation} data-aos-duration={item.duration}>
                      {item.subtitle}
                    </span>
                    <h3 className="text-anime-style-3">{item.title}</h3>
                    <div className="space16" />
                    <p data-aos={item.animation} data-aos-duration={item.descriptionDelay}>
                      {item.description}
                    </p>
                    <div className="space30" />
                    <div data-aos={item.animation} data-aos-duration={item.exitDelay}>
                      <Link to="/features" className="theme-btn9">
                        <span className="tb8">
                          Get More Info
                          <span className="arrow">
                            <FaArrowRight />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col lg={5}>
                  <div className="heading6 features-heading">
                    <span className="span3" data-aos={item.animation} data-aos-duration={item.startDelay}>
                      {item.subtitle}
                    </span>
                    <h3 className="text-anime-style-3">{item.title}</h3>
                    <div className="space16" />
                    <p data-aos={item.animation} data-aos-duration={item.duration}>
                      {item.description}
                    </p>
                    <div className="space30" />
                    <div data-aos={item.animation} data-aos-duration={item.descriptionDelay}>
                      <Link to="/features" className="theme-btn9">
                        <span className="tb8">
                          Get More Info
                          <span className="arrow">
                            <FaArrowRight />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col xs={1}></Col>
                <Col lg={6}>
                  <div className="main-image right60" data-aos="zoom-out" data-aos-duration={item.exitDelay}>
                    {/*<img src={item.image} alt={item.title} />*/}
                  </div>
                </Col>
              </>
            )}
          </Row>
        ))}
      </Container>
    </div>
  )
}

export default Feature
