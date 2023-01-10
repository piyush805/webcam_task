import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import axios from "axios"
import { useSelector } from "react-redux";

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    justify-content:space-around;
    background:url("https://cdn.wallpapersafari.com/3/93/juGSXV.jpg");
    object-fit:cover;
    background-size: cover;
    background-repeat: no-repeat;
    height:92vh;
`
const Card = styled.div`
    background-color:white;
    height:350px;
    width:350px;
    border-radius:8px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    /* opacity:0.9; */
    /* margin-top:100px; */
`
const Title = styled.div`
    font-size:22px;
    font-weight:600;
    margin-top: 30px;
    text-align:center;
`
const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    margin-top:30px;
`
const InputField = styled.input`
    width:70%;
    display:block;
    height:30px;
    outline:none;
    margin-top:10px;
    border-radius:4px;
    border:1px solid grey;
    padding:0 10px;
    font-size:16px;
    `
const Button = styled.button`
    margin:auto;
    width:120px;
    padding:10px;
    margin-top:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color: #1d1d4e;
    font-size:18px;
    font-weight:500;
    color:white;
    border-radius:5px;
    border:none;
    text-align:center;
    /* box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
    cursor: pointer;
`

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [error, setError] = useState(false);
    const user = useSelector(state => state.currentUser);
    if (user) {
        window.location.href = "/";
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', { name, email, mobile })
            console.log(res.data)
            if (res.status === 200) {
                setError(false)
                window.location.href = "/login";
            }
        } catch (error) {
            setError(true)
            console.log(error);
        }

        
    }
    return (
        <>
            <Navbar />
            <Container>
                <Card>
                    <Title>Create an Account</Title>
                    <InputContainer>
                        
                        <InputField placeholder='Name'
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(false)
                            }}></InputField>
                        <InputField placeholder='Email' onChange={(e) => { setEmail(e.target.value); setError(false) }}></InputField>
                        <InputField placeholder='Mobile' onChange={(e) => { setMobile(e.target.value); setError(false) }}></InputField>
                    </InputContainer>
                    <Button onClick={handleClick}>REGISTER</Button>
                    {error && <p style={{ color: "red",textAlign:"center" }}>Something went wrong...</p>}
                </Card>

            </Container>
        </>
    )
}

export default Register