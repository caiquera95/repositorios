import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Loading = styled.div `
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const BackButton = styled(Link) `
    background: transparent;
    border: 0;
    outline: 0;
    color: #444444;
`;

export const Container = styled.div `
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0 0.2);
    padding: 20px 20px;
    margin: 20px auto;
`;

export const Owner = styled.header `
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 200px;
        border-radius: 20%;
    }

    h1 {
        font-size: 1.8em;
        margin-top: 10px;
        color: #6d6d6d;
    }

    p{
        font-size: 1.1em;
        color: #666666;
        padding-bottom: 20px;
        text-align: center;
        line-heigth: 1.4;
        max-width: 400px;
    }
`;

export const FilterList = styled.div `
    button {
        outline: 0;
        border: 0;
        padding: 8px;
        border-radius: 4px;
        margin: 0 3px;
        font-weight: 600;

        &:nth-child(${props=> props.active + 1}){
            background: #294c79;
            color: #eee;
        }
    }
`;


export const IssuesList = styled.ul `
    margin-top: 10px;
    padding-top: 10px;
    border-top: 2px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #466995;
    }

    div {
        margin-left: 10px;

        p {
            margin-top: 5px;
            font-size: 1.1em;
            font-weight: 600;
            color: #294c79;
        }
    }

    strong {
        flex-direction: row;
        font-size: 1em;

        a {
            text-decoration: none;
            color: #444;
            transform: 0.3s;

            &:hover {
                color: #466995;
            }
        }

        span {
            background: #262525;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 5px;
            padding: 4px 4px;
            margin-left: 10px;
        }
    }
    
`;

export const PageActions = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        outline: none;
        border: 0;
        border-radius: 4px;
        color: #fff;
        background: #466995;
        font-size: 1em;
        padding: 10px;
        margin-top: 10px;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;