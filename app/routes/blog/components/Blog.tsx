//import blogBigImg from '@/assets/img/blog/blog-page-big-img.png'
//import blogSmallImg from '@/assets/img/blog/blog-page-smoll-img.png'
//import icon1 from '@/assets/img/icons/blog2-icon1.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

type blogType = {
  date: string
  title: string
  desc: string
}

const blogData: blogType[] = [
  {
    date: '10 October 2023',
    title: 'Power Up Your Digital Presence An Unleashing the Potential of Email.',
    desc: 'Online presence with our dynamic best landing pages, designed to captivate.',
  },
  {
    date: '20 October 2023',
    title: 'Transform Your Online Success, Harnessing the Power of Cutting',
    desc: 'Our comprehensive suite of tools best empowers your brand to break through.',
  },
  {
    date: '10 October 2023',
    title: 'Email Marketing SaaS, Riveting Landing Pages, and Trendsetting',
    desc: 'eSoft Eestablishing an influential online presence. With precision-targeted App.',
  },
]

const Blog = () => {
  return (
    <div className="blog-sce1 sp">
      <Container>
        <Row>
          <Col lg={12}>
            <Row className="blog-big-sec align-items-center">
              <Col lg={6}>
                <div className="image-main">
                  {/*<img src={blogBigImg} alt="Big Blog" />*/}
                </div>
              </Col>
              <Col lg={6}>
                <div className="headding2">
                  <span className="span">Email Marketing</span>
                  <h3>
                    <Link to="/blog-details">Elevate Engagement, Drive Conversions, Transform Ideas into Reality with WebDock Studio</Link>
                  </h3>
                  <p>Revolutionise your marketing strategy with an our cutting-edge Email Marketing SaaS. Seamlessly manage and optimise WebDock Studio.</p>
                  <div className="bottom-area">
                    <div className="autor-area">
                      <div className="image">
                        {/*<img src={blogSmallImg} alt="Author" />*/}
                      </div>
                      <div className="headding">
                        <h5>
                          <Link to="#">Jonson Brans</Link>
                        </h5>
                        <p>10 October 2023</p>
                      </div>
                    </div>
                    <div className="button">
                      <Link to="/blog-details">
                        Read More
                        <span>
                          <FaArrowRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {blogData.map((item, index) => (
            <Col lg={4} md={6} key={index}>
              <div className="blog-box">
                <div className="headding">
                  <div className="tags">
                    <Link to="#">
                      {/*<img src={icon1} alt="Icon" /> {item.date}*/}
                    </Link>
                  </div>
                  <h4>
                    <Link to="/blog-details">{item.title}</Link>
                  </h4>
                  <p>{item.desc}</p>
                  <Link to="/blog-details" className="learn">
                    Read more
                    <span>
                      <FaArrowRight />
                    </span>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Blog
