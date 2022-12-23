import React from 'react'
import styled from 'styled-components'

const MypageStats = () => {
    return (
        <MypagestatsContainer>
            <div>
                <h2>Stats</h2>
                <div className="user_stats_box"></div>
            </div>
        </MypagestatsContainer>
    )
}

export default MypageStats

const MypagestatsContainer = styled.div`
    .user_stats_box {
        background-color: white;
        border: 1px solid gray;
        border-radius: 5px;
        width: 300px;
        height: 150px;
    }
`
