import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const MypageEditList = () => {
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
                    />
                    <SizesExample /> {/* 프로필 수정 버튼*/}
                    <div className="edit-list">
                        <EditList />
                    </div>
                </div>
            </div>
        </MypageEditListContainer>
    )
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
    )
}

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
                >
                    Edit Picture
                </Button>
            </div>
        </>
    )
}

function EditList() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: 'bold' }}>
                    Display name
                </Form.Label>
                <Form.Control type="text" placeholder="이지은 (Lee ji eun)" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label style={{ fontWeight: 'bold' }}>Title</Form.Label>
                <Form.Control type="text" placeholder="No title has been set" />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label style={{ fontWeight: 'bold' }}>About</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ width: '600px' }}
                />
            </Form.Group>
            <Button variant="warning" type="submit">
                SAVE
            </Button>
        </Form>
    )
}

export default MypageEditList

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
`
