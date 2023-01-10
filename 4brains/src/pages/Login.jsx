import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    background:url("https://cdn.wallpapersafari.com/3/93/juGSXV.jpg");
    height:92vh;
    width:100vw;
    object-fit:cover;
    background-size: cover;
    background-repeat: no-repeat;
`
const Card = styled.div`
    background-color:white;
    height:350px;
    width:350px;
    border-radius:8px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    /* opacity:0.9; */
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
    margin-top:20px;
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
function Login() {
    const [email, setEmail] = useState("")
    const [showInput, setShowInput] = useState(false)
    const [otp, setOtp] = useState("")
    const user = useSelector(state => state.currentUser);
    const [error, setError] = useState(false);
    if (user) {
        window.location.href = "/";
    }
    const dispatch = useDispatch();

    const handleOtp = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/auth/otp', { email })
            if (res.status === 200) {
                setError(false)
                setShowInput(true);

            } else {
                setError(true)
            }
        } catch (error) {
            setError(true)
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post('/auth/login', { email, otp })
            dispatch(loginSuccess(res.data));
            setError(false)
            // window.location.href = "/";
        } catch (error) {
            setError(true)
            dispatch(loginFailure());
        }

    }
    return (
        <>
            <Navbar />
            <Container>
                <Card>
                    <Title>Login</Title>
                    <InputContainer>
                        <InputField placeholder='Email' onChange={(e) => { setEmail(e.target.value); setError(false); setShowInput(false) }}></InputField>
                        <Button onClick={handleOtp}>SEND OTP</Button>
                        {showInput &&
                            <div>
                                <InputField placeholder='OTP' onChange={(e) => setOtp(e.target.value)}></InputField>
                                <Button onClick={handleLogin}>LOGIN</Button>
                            </div>
                        }
                        {error && <p style={{ color: "red", textAlign: "center" }}>Something went wrong...</p>}
                    </InputContainer>
                </Card>

            </Container>
        </>
    )
}

export default Login