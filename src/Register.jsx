import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useState, createContext, useContext } from 'react';
import { Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './App';
const Register = () => {
    const apiBaseUrl = useContext(GlobalContext);
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const onFinish = (values) => {
        axios.post(`${apiBaseUrl}/users/register`, values)
            .then(response => {
                setResponse("Successfully registered!");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                setResponse(error.response.data.error.toString());
            });
    };

    return (
        <div>
        <h1>Register</h1>
        <Form onFinish={onFinish}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit">
                Register
            </Button>
            </Form.Item>
        </Form>
        {response && <Alert message={response} type="info" />}
        </div>
    );
    }

export default Register;