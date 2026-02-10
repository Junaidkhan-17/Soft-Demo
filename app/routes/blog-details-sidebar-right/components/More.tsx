//import blogImg1 from '@/assets/img/blog/blog2-img1.png'
//import blogImg2 from '@/assets/img/blog/blog2-img2.png'
//import iconDate from '@/assets/img/icons/blog2-icon1.png'
//import iconAuthor from '@/assets/img/icons/blog2-icon2.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

type BlogItem = {
  image: string
  dateIcon: string
  authorIcon: string
  date: string
  author: string
  title: string
  description: string
  link: string
}

const blogList: BlogItem[] = [
  {
    image: '1',/*blogImg1,*/
    dateIcon: '1',/*iconDate,*/
    authorIcon: '1',/*iconAuthor,*/
    date: '10 October 2023',
    author: 'Rabby Mahmud',
    title: 'The Ultimate Email Campaign Playbook',
    description: 'Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.',
    link: '/blog-details',
  },
  {
    image: '2',/*blogImg2,*/
    dateIcon: '2',/*iconDate,*/
    authorIcon: '2',/*iconAuthor,*/
    date: '10 October 2023',
    author: 'Rabby Mahmud',
    title: 'Email Design: A Deep Dive in Visual Impact',
    description: 'Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.',
    link: '/blog-details',
  },
]

const More = () => {
  return (
    <div className="blog2 sp">
      <Container>
        <Row>
          <Col lg={6} className="m-auto text-center">
            <div className="headding2">
              <h2>Our Latest Blog & News</h2>
              <div className="space16" />
              <p>Our dynamic Landing Pages redefine user experiences, eSoft ensuring every click counts, dive into the world of insightful.</p>
            </div>
          </Col>
        </Row>
        <div className="space30" />
        <Row>
          {blogList.map((item, i) => (
            <Col lg={6} key={i}>
              <div className="blog-box">
                <div className="image">
                  {/*<img src={item.image} alt="" />*/}
                </div>
                <div className="headding">
                  <div className="tags">
                    <Link to="#">
                      {/*<img src={item.dateIcon} alt="" />*/} {item.date}
                    </Link>
                    <Link to="#">
                        {/*<img src={item.authorIcon} alt="" /> */}{item.author}
                    </Link>
                  </div>
                  <h4>
                    <Link to={item.link}>{item.title}</Link>
                  </h4>
                  <p>{item.description}</p>
                  <Link to={item.link} className="learn">
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

export default More
