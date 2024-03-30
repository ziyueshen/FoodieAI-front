import Modal from "antd/es/modal/Modal";
import List from "antd/es/list";
import Button from "antd/es/button";
import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../App';
const History = ({user, isModalVisible, setIsModalVisible, chats, messages, setMessages}) => {
    const apiBaseUrl = useContext(GlobalContext);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleClick = (item) => {
        setMessages(item.messages);
    };

    return (
        <div>
            <Modal title="Saved Chat" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <List
                    dataSource={chats}
                    renderItem={item => (
                        <List.Item>
                            <Link to="/new-chat" onClick={() => handleClick(item)}>{item.query}</Link>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
}

export default History;