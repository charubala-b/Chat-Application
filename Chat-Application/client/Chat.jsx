import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './fin.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const time = new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: time,
            };

            await socket.emit("send_message", messageData);

            try {
                const response = await fetch('http://localhost:3001/add-Chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                });
                const result = await response.json();
                console.log('Message save result:', result);

                if (result.status === 'inserted successfully') {
                    console.log('Message saved successfully');
                } else {
                    console.error('Error saving message:', result['error-occurrence']);
                }
            } catch (error) {
                console.error('Error saving message:', error);
            }

            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setCurrentMessage((prevMessage) => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const imageData = {
                    room: room,
                    author: username,
                    message: `<img src="${reader.result}" alt="sent image" style="max-width: 100%; height: auto;" />`,
                    time: new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                await socket.emit("send_message", imageData);

                try {
                    const response = await fetch('http://localhost:3001/add-Chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(imageData),
                    });
                    const result = await response.json();
                    console.log('Image save result:', result);

                    if (result.status === 'inserted successfully') {
                        console.log('Image saved successfully');
                    } else {
                        console.error('Error saving image:', result['error-occurrence']);
                    }
                } catch (error) {
                    console.error('Error saving image:', error);
                }

                setMessageList((list) => [...list, imageData]);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent, index) => {
                        return (
                            <div key={index} className='message' id={username === messageContent.author ? "you" : "other"}>
                                <div className='inc'>
                                    <div className='message-content' dangerouslySetInnerHTML={{ __html: messageContent.message }}></div>
                                    <div className='message-meta'>
                                        <p id='time'>{messageContent.time}</p>
                                        <p id='author'>{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder='Hey...'
                    onChange={(event) => setCurrentMessage(event.target.value)}
                    onKeyPress={(event) => { event.key === "Enter" && sendMessage(); }}
                />
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
                {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="fileInput" />
                <button onClick={() => document.getElementById('fileInput').click()}>📷</button>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
};

export default Chat;
