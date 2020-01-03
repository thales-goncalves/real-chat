import styled from "styled-components";

export const Container = styled.div`

  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
 
  &::-webkit-scrollbar-track {
    background-color: #FFFBFE;
  }
  &::-webkit-scrollbar {
    width: 5px;
    background-color: green;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #484d79;
  }

  .typing-user {
    text-align: right;
    margin: 10px 15px;
  }

  .thread {
    position: relative;
    width: 100%;
    min-height: 900px;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #FFFBFE;
    background: #76777f;
  }

  .message-container {
    display: flex;
    justify-content: flex-start;
    min-height: 50px;
    margin: 10px 15px;
    animation: 0.65s ease-out 0s show;
    .time {
      order: 1;
      font-size: 0.8rem;
    }
    .data {
      order: 2;
      height: 100%;
      margin-left: 1.5%;
      font-size: 1.2rem;
    }
    .name {
      font-size: 0.65em;
      margin-top: 5px;
      text-align: right;
    }
    .message {
      background: #454751;
      border-radius: 5px;
      border-top-left-radius: 0;
      box-sizing: border-box;
      color: #FFFBFE;
      height: 100%;
      padding: 10px 15px;
      position: relative;
      
      &::before {
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: #454751;
        border-style: solid;
        border-top-color: #454751;
        border-width: 4px;
        content: "";
        height: 0;
        left: -7px;
        position: absolute;
        top: 0;
        width: 0;
      }
    }
  }
  .message-container.right {
    text-align: right;
    justify-content: flex-end;
    .time {
      order: 2;
      margin-left: 1.5%;
      font-size: 0.8rem;
    }
    .data {
      margin-left: 0;
      order: 1;
      font-size: 1.1rem;
    }
    .name {
      display: none;
    }
    .message {
      background: #282a36;
      color: #FFFBFE;
      border-top-right-radius: 0;
      border-top-left-radius: 5px;
      &::before {
        border-top-color: #282a36;
        border-left-color: #282a36;
        border-right-color: transparent;
        left: auto;
        right: -7px;
      }
    }
  }
`;
