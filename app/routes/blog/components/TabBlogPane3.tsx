//import blogImg1 from '@/assets/img/blog/blog2-img1.png'
//import blogImg2 from '@/assets/img/blog/blog2-img2.png'
//import blogImg3 from '@/assets/img/blog/blog2-img3.png'
//import blogImg4 from '@/assets/img/blog/blog2-img4.png'
//import blogImg5 from '@/assets/img/blog/blog2-img5.png'
//import blogImg6 from '@/assets/img/blog/blog2-img6.png'
//import icon1 from '@/assets/img/icons/blog2-icon1.png'
//import icon2 from '@/assets/img/icons/blog2-icon2.png'
import { Link } from '@remix-run/react'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa6'

type blogType = {
  //image: string
  date: string
  author: string
  title: string
  link: string
}

const blogData3: blogType[] = [
  { /*image: blogImg5,*/ date: '10 October 2023', author: 'Lois Stiedemann', title: 'The Ultimate Email Campaign Playbook', link: '/blog-details' },
  { /*image: blogImg6,*/ date: '10 October 2023', author: 'Owen Lindgren', title: 'Best Project Management Software eSoft', link: '/blog-details' },
  { /*image: blogImg1,*/ date: '10 October 2023', author: 'Rabby Mahmud', title: 'The Ultimate Email Campaign Playbook', link: '/blog-details' },
  { /*image: blogImg2,*/ date: '10 October 2023', author: 'Rabby Mahmud', title: 'Email Design: A Deep Dive in Visual Impact', link: '/blog-details' },
  { /*image: blogImg3,*/ date: '10 October 2023', author: 'Rabby Mahmud', title: 'Our Proven Project Management Approach', link: '/blog-details' },
  { /*image: blogImg4,*/ date: '10 October 2023', author: 'Mr. Blanca White', title: 'Empowering Projects Expert Management', link: '/blog-details' },
]

const TabBlogPane3 = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div className="tab-pane fade" id="tab-contact3" role="tabpanel" aria-labelledby="tab-contact3-tab" style={style}>
      <div className="all-boxs">
        <Row>
          {blogData3.map((item, index) => (
            <Col lg={6} key={index}>
              <div className="blog-box">
                <div className="image">
                 {/* <img src={item.image} alt={`Blog ${index + 1}`} />*/}
                </div>
                <div className="headding">
                  <div className="tags">
                    <Link to="#">
                     {/* <img src={icon1} alt="date" /> */}{item.date}
                    </Link>
                    <Link to="#">
                      {/*<img src={icon2} alt="author" /> */}{item.author}
                    </Link>
                  </div>
                  <h4>
                    <Link to={item.link}>{item.title}</Link>
                  </h4>
                  <p>Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.</p>
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
      </div>
    </div>
  )
}

export default TabBlogPane3
