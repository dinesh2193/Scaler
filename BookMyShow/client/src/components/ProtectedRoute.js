import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined
} from "@ant-design/icons"
import { Layout, message, Menu } from "antd"

import { SetLoading } from "../redux/loaderSlice"
import { SetUser } from "../redux/userSlice"
import { GetCurrentUser } from "../api/users"
import { useEffect } from 'react'

function ProtectedComponent({children}) {

    const { user } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(user)
    const navItems = [
        {
            label: "Home",
            key: "/",
            icon: <HomeOutlined />
        },
        {
            label: `${user ? user.name : ""}`,
            icon: <UserOutlined />,
            children: [
                {
                    label: (
                        <span onClick={()=>{
                            if (user.role === "admin") {
                                navigate("/admin")
                            } else if (user.role === "partner") {
                                navigate("/partner")
                            } else {
                                navigate("/profile")
                            }
                        }}>My Profile</span>
                    ),
                    icon: <ProfileOutlined />
                },
                {
                    label: (
                        <Link to="/login" onClick={()=>{localStorage.removeItem("token")}}>Logout</Link>
                    ),
                    icon: <LogoutOutlined />
                }
                
            ]
        }
    ]

    const { Header, Sider, Content, Footer } = Layout

    const getValidUser = async () => {
        try {
            dispatch(SetLoading(true))
            const response = await GetCurrentUser();
            console.log(response)
            dispatch(SetUser(response.data))
        } catch(err) {
            console.log(err)
            message.error("Please login again")
            dispatch(SetUser(null))
        } finally {
            dispatch(SetLoading(false))
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getValidUser()
        } else {
            navigate("/login")
        }
    }, [])


    return (
        user && (
            <>
                <Layout>
                    <Header
                        className="d-flex justify-content-between"
                        style={{
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                        >
                            <h3 className="text-white m-0" style={{ color: "white" }}>
                                        Book My Show
                            </h3>
                            <Menu theme="dark" mode="horizontal" items={navItems} />
                    </Header>
                    <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                        {children}
                    </div>
                </Layout>
            </>
        )
    )
}

export default ProtectedComponent