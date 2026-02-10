import { Container, Row } from 'react-bootstrap'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const Details = () => {
  return (
    <>
      <div className="blog-details-sidebar">
        <Container>
          <Row>
            <LeftSide />
            <RightSide />
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Details
