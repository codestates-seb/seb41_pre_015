import React from 'react'
import styled from 'styled-components'

import MypageMain from '../component/MypageMain'
import MypageTitle from '../component/MypageTitle'
import MypageStats from '../component/MypageStats'

const MyPage = () => {
    return (
        <MypageContainer>
            <div className="MypageContainer">
                <MypageTitle />
                <HorizonLine />
                <div
                    style={{ display: 'flex' }}
                    className="MypagebottomContainer"
                >
                    {<MypageStats />}
                    {<MypageMain />}
                </div>
            </div>
        </MypageContainer>
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

export default MyPage

const MypageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 40px 0px 0px 20px;

    .MypagebottomContainer {
        margin-top: 40px;
    }
`
