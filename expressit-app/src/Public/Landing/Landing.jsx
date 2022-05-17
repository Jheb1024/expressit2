import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import registerImage from "C:/Users/jhan_/Documents/Expressit2/expressit2/expressit-app/src/Assets/images/all.png";
import './Landing.css'
function Landing() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div class="texto">
              Lee <br />
              &nbsp;Escribe <br />
              &nbsp;&nbsp;Imagina <br />
              &nbsp;&nbsp;&nbsp;Expresa! <br />
            </div>
          </Col>
          <Col>
            <div>
              <img src={registerImage} style={{ width: '600px', height: '500px' }}></img>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Landing