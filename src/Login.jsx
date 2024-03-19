import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, createContext } from 'react';
import axios from 'axios';
import { Alert } from 'antd';
import { GlobalContext } from './App';

const Login = ({ user, fetchUser }) => {
    const apiBaseUrl = useContext(GlobalContext);
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const onFinish = (values) => {
        axios.post(`${apiBaseUrl}/users/login`, values)
            .then(response => {
                navigate('/');
                const token = response.data.token;

                // 将令牌保存在 localStorage 中
                localStorage.setItem('authToken', token);
                // 登录成功，刷新用户信息
                fetchUser();
            })
            .catch(error => {
                console.log(error);
                setResponse("Login failed! Please check your username and password.");
            });
    };
    return (
        <div>
            <h1>Log in</h1>
            <Form onFinish={onFinish}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/register">Sign Up</Link>
            {response && <Alert message={response} type="info" />}
        </div>
    );
}
export default Login;