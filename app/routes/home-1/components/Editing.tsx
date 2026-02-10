//import editing6Icon1 from '@/assets/img/icons/editing6-icon1.svg'
//import editing6Icon2 from '@/assets/img/icons/editing6-icon2.svg'
//import editing6Icon3 from '@/assets/img/icons/editing6-icon3.svg'
//import editing6Icon4 from '@/assets/img/icons/editing6-icon4.svg'
//import editing6Icon5 from '@/assets/img/icons/editing6-icon5.svg'
//import editing6Icon6 from '@/assets/img/icons/editing6-icon6.svg'
//import SpanImg6 from '@/assets/img/icons/span-image6.png'
import { Link } from '@remix-run/react'
import { Col, Container, Row } from 'react-bootstrap'

export type EditingType = {
  Duration: number
  image: string
  title: string
  des: string
}

export const EditingData: EditingType[] = [
  {
    Duration: 600,
    image: '1',//editing6Icon1,
    title: 'Drag & Drop Editing',
    des: 'Drag a "Text Editor" widget from the sidebar and drop it into the desired section or column on your page.',
  },
  {
    Duration: 900,
    image: '2',//editing6Icon2,
    title: 'True Visual Editing',
    des: 'Design your page in real time and see the results instantly. Create an customize your all landing pages.',
  },
  {
    Duration: 1100,
    image: '3',//editing6Icon3,
    title: 'Custom CSS Control',
    des: "Developers can easily combine Divi's visual design controls with their own custom CSS, WebDock Studio interface is best.",
  },
  {
    Duration: 700,
    image: '4',//editing6Icon4,
    title: 'Responsive Editing',
    des: 'WebDock Studio Building beautiful responsive websites is easy. Divi is responsive by nature & also gives full control.',
  },
  {
    Duration: 1100,
    image: '5',//editing6Icon5,
    title: 'Copy/Paste Design',
    des: 'WebDock Studio Save and manage unlimited custom designs. Easily re-use them to jump-start new home pages.',
  },
  {
    Duration: 800,
    image: '6',//editing6Icon6,
    title: 'Global Element Styles',
    des: "Manage your entire website's design using global elements and website-wide design settings.",
  },
]

const Editing = () => {
  return (
    <div className="editing6 sp" id="editing">
      <Container>
        <Row>
          <Col lg={6} className="m-auto text-center">
            <div className="heading6">
              <span className="title">
                {/*<img src={SpanImg6} alt="" />*/}
              </span>
              <h2 className="text-anime-style-3">Powerful Visual Editing For Your Entire Website</h2>
            </div>
          </Col>
        </Row>
        <div className="space30" />
        <Row>
          {EditingData.map((item, idx) => (
            <Col lg={4} md={6} key={idx} data-aos="zoom-in-up" data-aos-duration={item.Duration}>
              <div className="editing-box">
                <div className="icon">
                  {/*<img src={item.image} alt="" />*/}
                </div>
                <div className="space16" />
                <div className="heading6">
                  <h4>
                    <Link to="/features">{item.title}</Link>
                  </h4>
                  <div className="space16" />
                  <p>{item.des}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Editing
