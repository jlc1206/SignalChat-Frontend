import React from 'react';
import { Container } from 'reactstrap';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footerContainer">
        <footer>
          <Container>
            <p className="rightSide">#MakeChatGreatAgain</p>
            <p className="leftSide">Copyight &copy; 2018 Jeremiah Cooley and Josh Kennedy</p>
          </Container>
        </footer>
      </div>
    );
  }
};
