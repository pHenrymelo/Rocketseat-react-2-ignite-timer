import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;

    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem
    }
`

export const BaseCountdownButton = styled.button`
    width: 100%;
    border: none;

    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    cursor: pointer;

    
    color: ${(props) => props.theme["gray-100"]};
    transition: 0.5s;

    &:disabled {
        opacity: 0.7;
        color: ${(props) => props.theme["gray-300"]};
        transition: 0.5s;

        cursor: not-allowed;
    }

`
export const StartCountdownButton = styled(BaseCountdownButton)`
    background: ${(props) => props.theme["green-500"]};

    &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
        transition: 0.5s;
    }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
    background: ${(props) => props.theme["red-500"]};

    &:not(:disabled):hover {
        background: ${(props) => props.theme["red-700"]};
        transition: 0.5s;
    }
`