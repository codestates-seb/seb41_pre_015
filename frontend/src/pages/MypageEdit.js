import React from 'react'
import styled from 'styled-components'

import MypageTitle from '../component/Mypage/MypageTitle'
import MypageStats from '../component/Mypage/MypageStats'
import MypageEditList from '../component/Mypage/MypageEditList'

const MypageEdit = () => {
    return (
        <MypageEditContainer>
            <div className="MypageContainer">
                <MypageTitle />
                <HorizonLine />
                <div
                    style={{ display: 'flex' }}
                    className="MypagebottomContainer"
                >
                    {<MypageStats />}
                    {<MypageEditList />}
                </div>
            </div>
        </MypageEditContainer>
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

export default MypageEdit

const MypageEditContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 40px 0px 0px 50px;

    .MypagebottomContainer {
        margin-top: 40px;
    }
`
