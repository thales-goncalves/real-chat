import styled from "styled-components";

export const Container = styled.div`

    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius: 30px;
        background-color: #282a36;
        padding: 50px 30px;
        width: 350px;
        text-align: center;
        .login-btn {
            background: #282a36;
            color: #FFFBFE;
            text-align: center;
            padding: 7px 10px;
            height: 40px !important;
            border-radius: 10px;
            margin-bottom: 5px;
        }

        .error {
            text-align: center;
            margin: 5px 0;
            padding: 4px 10px;
            color: #c92c43;
        }
        input {
            max-width: 100%;
            border-top: none;
            border-left: none;
            border-right: none;
            height: 2rem;
            line-height: 20px;
            border-radius: 15px;
            font-size: 20px;
            border: solid 2px #FFFBFE;
            transition: all 0.23s ease-in;
            width: 100%;
            text-align: center;
            margin-bottom: 7px;
            
        }
        input:focus {
            border-bottom: solid 2px #FFFBFE;
            outline: none;
        }
}
`