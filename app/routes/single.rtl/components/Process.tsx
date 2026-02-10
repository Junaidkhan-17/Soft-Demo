import span9 from '@/assets/img/logo/span9.svg'
import img1 from '@/assets/img/work/work-prosses7-img1.png'
import img2 from '@/assets/img/work/work-prosses7-img2.png'
import img3 from '@/assets/img/work/work-prosses7-img3.png'
import img4 from '@/assets/img/work/work-prosses7-img4.png'
import img5 from '@/assets/img/work/work-prosses7-img5.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

type processType = {
  title: string
  desc: string
  image: string
  className: string
  duration: string
  col: number
}

export const processItems: processType[] = [
  {
    title: 'Al-Powered Productivity',
    desc: 'With an intuitive interface and powerful features, our platform simplifies collaboration, allowing you to effortlessly delegate.',
    image: img1,
    className: 'left-top',
    duration: '800',
    col: 6,
  },
  {
    title: 'View Work Your Way',
    desc: "Team's project management experience. Our robust suite & offers a unified hub an task allocation, collaboration, project.",
    image: img2,
    className: 'right-top',
    duration: '1000',
    col: 6,
  },
  {
    title: 'Search Anythings',
    desc: 'With integrated file sharing & version control, your team a access manage',
    image: img3,
    className: 'right-top',
    duration: '900',
    col: 4,
  },
  {
    title: 'Team Collaboration',
    desc: 'Our platform brings together task an boards, share calendars, document.',
    image: img4,
    className: 'left-bottom',
    duration: '1200',
    col: 4,
  },
  {
    title: 'Customized In Click',
    desc: 'Empower your projects with a holistic workspace solution that a simplifies.',
    image: img5,
    className: 'right-bottom',
    duration: '1200',
    col: 4,
  },
]

const Process = () => {
  return (
    <>
      <div className="space100" />
      <div className="work-prosess9 sp _relative" id="work-prosess">
        <Container>
          <Row>
            <Col lg={7} className="m-auto text-center">
              <div className="heading9">
                <span className="span" data-aos="zoom-in-left" data-aos-duration="700">
                  <img src={span9} alt="" /> eSoft Workforce
                </span>
                <h2 className="text-anime-style-3"> Empower Of HR Workforce</h2>
              </div>
            </Col>
          </Row>
          <div className="space30" />
          <Row>
            {processItems.map((item, idx) => (
              <Col lg={item.col} key={idx}>
                <div className={`work-box-area ${item.className}`}>
                  <div className="single-box" data-aos="zoom-in-up" data-aos-duration={item.duration}>
                    <div className="heading7">
                      <h4>
                        <Link to="">{item.title}</Link>
                      </h4>
                      <div className="space16" />
                      <p>{item.desc}</p>
                    </div>
                    <div className="space40" />
                    <div className="image">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className="space100" />
    </>
  )
}

export default Process
