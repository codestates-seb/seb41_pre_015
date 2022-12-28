import styled from 'styled-components';
import Footer from '../component/Footer';
import Header from '../component/login/LoginHeader';
// import LeftSidebar from '../component/LeftSidebar';
import ErrorImg from '../images/error_img.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <ErrorContainer>
        <div>
          <div style={{ display: 'flex' }}>
            {<img src={ErrorImg} alt=" "></img>}
            {
              <div className="page-explain">
                <h4>
                  Page Not Found
                  <br />
                  <br />
                </h4>
                <div>
                  <h6>
                    We are sorry, we could not find the page you requested.
                    <p />
                  </h6>
                  <h6>
                    Try{' '}
                    <Link
                      to="/main"
                      style={{
                        color: 'rgb(92,140,222)',
                        textDecoration: 'none',
                      }}
                    >
                      searching for similar questions
                    </Link>
                    <p />
                  </h6>
                  <h6>
                    Browse our{' '}
                    <Link
                      to="/mypage"
                      style={{
                        color: 'rgb(92,140,222)',
                        textDecoration: 'none',
                      }}
                    >
                      recent questions
                    </Link>
                    <p />
                  </h6>
                  <h6>
                    Browse our{' '}
                    <Link
                      to="/main"
                      style={{
                        color: 'rgb(92,140,222)',
                        textDecoration: 'none',
                      }}
                    >
                      popular tags
                    </Link>
                    <p />
                  </h6>
                  <h6>
                    If you feel something is missing that should be here{', '}
                    <Link
                      to="/main"
                      style={{
                        color: 'rgb(92,140,222)',
                        textDecoration: 'none',
                      }}
                    >
                      contact us.
                    </Link>
                    <p />
                  </h6>
                </div>
              </div>
            }
          </div>
        </div>
      </ErrorContainer>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;

  .page-explain {
    margin: 70px 0px 0px 0px;
  }
`;
