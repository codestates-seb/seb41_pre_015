// import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// eslint-disable-next-line no-unused-vars
import { useState } from 'react';

export default function EditListMypage() {
  const [aboutText, setAboutText] = useState('');
  const [userName, setUserName] = useState('');

  // const handleClickSubmit = () => {};

  return (
    <MypageEditListContainer>
      <div>
        <h4>Edit your profile</h4>
        <HorizonLine />
        <h5>Public information</h5>
        <div className="edit-box">
          <div style={{ height: '30px' }}></div>
          <div>
            <h7
              style={{
                fontWeight: 'bold',
                marginLeft: '30px',
              }}
            >
              Profile image
            </h7>
          </div>
          <img
            className="edit-img"
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FekfshA%2FbtqUnKjFURC%2FAK2XK3NwkQZCHjNKBOPz00%2Fimg.jpg"
            alt=" "
          />
          <SizesExample /> {/* 프로필 수정 버튼*/}
          <div className="edit-list">
            <div id="inputBox">
              <div className="lable">Display name</div>
              <input
                className="input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="이지은 (Lee ji eun)"
              ></input>
            </div>
            <div id="inputBox">
              <div className="lable">Title</div>
              <input
                className="input"
                placeholder="No title has been set"
              ></input>
            </div>
            <div className="editorbox">
              <div className="lable">About</div>
              <div className="editor">
                <textarea
                  value={aboutText}
                  className="aboutInput"
                  onChange={(e) => setAboutText(e.target.value)}
                />
              </div>
            </div>
            <div className="btnBox">
              <button className="saveBtn">Save profile</button>
            </div>
          </div>
        </div>
      </div>
    </MypageEditListContainer>
  );
}

const HorizonLine = () => {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        borderBottom: '1px solid #aaa',
        lineHeight: '0.1em',
        margin: '10px 0 20px',
      }}
    ></div>
  );
};

function SizesExample() {
  return (
    <>
      <div>
        <Button
          style={{
            marginLeft: '30px',
            width: '150px',
            height: '40px',
            fontSize: 'smaller',
          }}
          variant="secondary"
          size="lg"
          className="saveBtn"
          // onClick={handleClickSubmit}
        >
          Edit Picture
        </Button>
      </div>
    </>
  );
}

// function EditList() {
//   return (
//     <Form>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label style={{ fontWeight: 'bold' }}>Display name</Form.Label>
//         <Form.Control type="text" placeholder="이지은 (Lee ji eun)" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicText">
//         <Form.Label style={{ fontWeight: 'bold' }}>Title</Form.Label>
//         <Form.Control type="text" placeholder="No title has been set" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//         <Form.Label style={{ fontWeight: 'bold' }}>About</Form.Label>
//         <Form.Control as="textarea" rows={3} style={{ width: '600px' }} />
//       </Form.Group>
//       <Button variant="warning" type="submit">
//         SAVE
//       </Button>
//     </Form>
//   );
// }

// export default MypageEditList;

const MypageEditListContainer = styled.div`
  margin-left: 20px;

  .edit-box {
    border: 1px solid lightgray;
    width: 700px;
    height: auto;
    border-radius: 2px;
  }

  .edit-img {
    width: 150px;
    height: 150px;
    margin: 10px 0px 0px 30px;
  }

  .edit-list {
    width: 500px;
    margin: 20px 30px 30px 30px;
  }

  .lable {
    margin: 4px;
    margin-right: 0;
    margin-left: 0;
    font-size: 1rem;
    font-family: inherit;
    color: black;
    font-weight: 600;
    padding: 0;
  }

  .input {
    border: 1px solid rgba(111, 111, 111, 0.497);
    padding: 10px;
    border-radius: 3px;
    min-width: 300px;
    width: 40%;
    height: 30px;
    box-sizing: border-box;
  }

  #inputBox {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
  }

  .editorbox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
  }
  .editor {
    width: 100%;
  }

  .lable {
    font-size: 1rem;
    color: black;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .aboutInput {
    width: 100%;
    height: 300px;
    vertical-align: top;
    padding: 10px;
    font-size: 1rem;
    font-weight: 600;
    text-indent: 5px;
    margin-bottom: 30px;
  }

  .saveBtn {
    color: white;
    margin-right: 0;
    margin-left: 0;
    margin: 1px;
    background-color: hsl(206, 100%, 52%);
    box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
    padding: 0.8em;
    border: 1px solid transparent;
    border-radius: 3px;
    outline: none;
    font-family: inherit;
    font-weight: normal;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }
`;
