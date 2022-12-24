import styled from 'styled-components';
import TitleImage from '../../images/Title-image.png';
import WriteQuestion from './WriteQuestion';

const SbackGround = styled.div`
  background-color: #f9f9f9;
  height: auto;
  display: flex;
  justify-content: center;
  border-top: 3px solid #d2d2d2;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .Title-container {
    width: 90%;
    height: 20%;
    display: flex;
    align-items: center;
    h1 {
      color: black;
      flex-grow: 1;
    }
    img {
      width: 50%;
      height: 100%;
    }
  }
`;

const AddQuesTitle = () => {
  return (
    <SbackGround>
      <div className="Title-container">
        <h1>모르는 문제 질문 하기</h1>
        <img src={TitleImage} alt="titleImage" />
      </div>
      <WriteQuestion />
    </SbackGround>
  );
};

export default AddQuesTitle;
