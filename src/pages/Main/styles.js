import styled, {keyframes, css} from 'styled-components';

export const Container = styled.div `
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 50px rgba(0,0,0 0.2);
    padding: 60px;
    margin: 140px auto;

    h1 {
        font-size: 24px;
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: row;

         svg {
             margin-right: 10px;
             color: #222;
         }
    }
`;

export const Form = styled.form `
    margin-top: 30px;
    display:flex;
    flex-direction: row;
    

    input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        border: 1px solid ${props => (props.error ? '#ff4040' : '#808080')};
        border-radius: 4px;
        margin-right: 10px;
    }
`;

//create animation button
const animate = keyframes `
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
    
`

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
  }))`
    color: ##fff;
    background: #A4B0F5;
    border-radius: 4px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 14px;
    transition: 0.3s all;

    :hover {
        background: #8e9cf3;
    }

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }


    ${props => props.loading && 
        css `
        svg{
            animation: ${animate} 2s linear infinite;
        }`
    }
`;

export const List = styled.ul `
    list-style: none;
    margin-top: 20px;
    margin-left: 5px;

    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 10px;
        color: #6d6d6d;
        font-weight: 500;
    }

    & + li {
        border-top: 1px solid #F0B27A; 
    }


    a {
        color: #444444;
        text-decoration: none;
        margin-right: 15px;
    }

`;


export const DeleteButton = styled.button.attrs({
    type: 'button'
})` 
    border: 0;
    background: transparent;
    margin: 7px;
    outline: 0;
    transition: 0.3s;
    color: #6d6d6d;


    :hover {
        color: #E74C3C;
    }

   
`;