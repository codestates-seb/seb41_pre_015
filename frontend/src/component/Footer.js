import styled from 'styled-components';

const SbackGround = styled.div`
  background-color: #323232;
  display: flex;
  height: 50vh;
  padding: 20px;
  color: #b4b4b4;
  padding: 32px;
  .footer-container {
    display: flex;
    margin: 20px;
  }
  .List-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin-right: 20px;
  }
  .footer-ul {
    list-style: none;
    padding-left: 0;
    font-size: small;
    li {
      font-weight: 200;
    }
  }
  .img-container {
    margin: 0;
    padding: 0;
  }
  h6 {
    font-size: 13px;
    font-weight: 700;
  }
  .sns-ul-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: small;
    margin-left: 30px;
  }
  .sns-ul {
    list-style: none;
    padding: 0;
    li {
      float: left;
      font-size: small;
      margin-right: 10px;
    }
  }
`;

const Sfooterlogo = styled.img`
  background-color: #323232;
  width: 50px;
  height: 50px;
`;

const Footer = () => {
  return (
    <footer>
      <SbackGround>
        <div className="img-container">
          <Sfooterlogo
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
            alt=" "
          />
        </div>
        <div className="footer-container">
          <div className="List-container">
            <h6>STACK OVERFLOW</h6>
            <ul className="footer-ul">
              <li>Questions</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="List-container">
            <h6>PRODUCTS</h6>
            <ul className="footer-ul">
              <li>Teams</li>
              <li>Advertising</li>
              <li>Collectives</li>
              <li>Talent</li>
            </ul>
          </div>
          <div className="List-container">
            <h6>COMPANY</h6>
            <ul className="footer-ul">
              <li>About</li>
              <li>Press</li>
              <li>Work Here</li>
              <li>Legal</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
              <li>Cookie Settings</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div className="List-container">
            <h6>STACK EXCHANGE NETWORK</h6>
            <ul className="footer-ul">
              <li>Technology</li>
              <li>Culture & recreation</li>
              <li>Life & arts</li>
              <li>Science</li>
              <li>Professional</li>
              <li>Business</li>
              <li>API</li>
              <li>Data</li>
            </ul>
          </div>
          <div className="sns-ul-container">
            <ul className="sns-ul">
              <li>Blog</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
            </ul>
            <div>
              Site design / logo © 2022 Stack Exchange Inc; user contributions
              licensed under CC BY-SA. rev 2022.12.21.43127
            </div>
          </div>
        </div>
      </SbackGround>
    </footer>
  );
};

export default Footer;
