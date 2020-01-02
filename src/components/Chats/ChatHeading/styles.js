import styled from 'styled-components'


export const Container = styled.div`

    background: #f5f5f5;
    box-shadow: 0px 6px 5px -2px rgba(225, 225, 225, 0.7);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 12vh;
    max-height: 65px;
    padding: 18px 16px;
    color: #32465a;
    
    .user-info {
        align-items: center;
        display: flex;
        font-family: 'Notable', sans-serif;
        .user-name {
             margin-right: 10px;
        }
        .status {
            align-items: center;
            display: flex;
            .indicator{
                color: #f00
            }
        }
    }
    .options {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        height: 100%;
        width: 15%;
        svg {
            cursor: pointer;
        }
}
`;