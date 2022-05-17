import React from 'react'
import { Card, Nav, Col, Row, Container } from 'react-bootstrap';
import {ImHome} from 'react-icons/im';
import {FaUserCircle} from 'react-icons/fa'
import {RiQuillPenFill, RiFileList3Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom';

function SidebarUser() {
    return (
        <div>
            <Nav defaultActiveKey="/home" className="flex-column" style={{ width: '10%', justifyItems: 'center' }}>
                <Link to={'/public/listposts'} style={{padding:'10px'}}><ImHome style={{color:'black', width:'30px', height:'30px'}}/></Link>
                <Link to={'/user/home'} style={{padding:'10px'}}><FaUserCircle style={{color:'black', width:'30px', height:'30px'}}/></Link>
                <Link to={'/user/addpost'} style={{padding:'10px'}}><RiQuillPenFill style={{color:'black', width:'30px', height:'30px'}}/></Link>
                <Link to={'/user/myposts'} style={{padding:'10px'}}><RiFileList3Fill style={{color:'black', width:'30px', height:'30px'}}/></Link>
            </Nav>
        </div>
    )
}

export default SidebarUser
