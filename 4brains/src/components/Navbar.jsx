import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/userSlice';
import axios from 'axios';

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:50px;
    background-color:white;
    box-shadow:1px 0px 5px #999999;
    opacity:0.9;
`
const Title = styled.div`
    font-size:24px;
    font-weight:800;
    margin: 0 40px ;
`
const NavItem = styled.div`
    margin: 0 30px ;
    cursor: pointer;
    text-decoration:none;
    color:black;
`

const Right = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const Left = styled.div``
function Navbar() {
    const user = useSelector(state => state.currentUser)
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await axios.post("/auth/logout")
        if (res.status === 200) {
            dispatch(logout());
        }


    }
    return (
        <Container>
            <Left>
                <Title>Webcam</Title>
            </Left>
            <Right>

                
                    
                        <Link to="/register">{!user &&<NavItem> Register</NavItem>}</Link>
                        <Link to="/login">{!user && <NavItem>Login</NavItem>}</Link>
                    
                    
                    
                    {user && <NavItem onClick={handleLogout}>Logout</NavItem>}
                
            </Right>


        </Container>
    )
}

export default Navbar