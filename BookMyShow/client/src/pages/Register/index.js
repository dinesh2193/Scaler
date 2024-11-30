import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/users";


function Register() {
    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values)
            if (response.success) {
                message.success(response.message)
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <>
            <main className="App-header">
                <h1>Register to Book My Show</h1>
                <section className="mw-500 text-center px-3">
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            htmlFor="name"
                            name="name"
                            className="d-block"
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input id="name" type="text" placeholder="Enter Your Name" />
                        </Form.Item>
                        <Form.Item 
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Please enter a valid email" },
                            ]}
                        >
                            <Input id="email" type="text" placeholder="Enter Your Email" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            htmlFor="password"
                            name="password"
                            className="d-block"
                            rules={[{ required: true, message: "Password is required" }]}
                        >
                            <Input id="password" type="password" placeholder="Enter Your Password" />
                        </Form.Item>
                        <Form.Item className="d-block">
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{ fontSize: "1rem", fontWeight: "600" }}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p>
                            {" "}
                            Already a User ? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Register