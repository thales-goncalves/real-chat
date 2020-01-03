import styled from "styled-components";

export const Container = styled.div`
  background: #282a36;
  color: #fffbfe;
  box-sizing: border-box;
  height: 10vh;
  max-height: 65px;

  .message-form {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .send {
      width: 20%;
      box-sizing: border-box;
      font-size: 1.25em;
      text-align: center;
      border: none;
      height: 100%;
      color: #fffbfe;
      background: #454751;
      transition: all 0.35s ease-out;
    }

    .send:disabled {
      opacity: 0.2;
      background: #282a36;
    }

    .form-control {
      padding-top: 24px;
      padding-bottom: 24px;
      resize: none;
      padding-left: 15px;
      box-sizing: border-box;
      width: 80%;
      height: 100%;
      border: none;
      background: #282a36;
      color: #fffbfe;
      font-size: 1.1rem;
    }
    .form-control::-webkit-scrollbar-track {
      background-color: #fffbfe;
    }
    .form-control::-webkit-scrollbar {
      width: 5px;
      background-color: green;
    }
    .form-control::-webkit-scrollbar-thumb {
      background-color: #484d79;
    }
    .form-control:focus {
      outline: none;
    }
  }
`;
