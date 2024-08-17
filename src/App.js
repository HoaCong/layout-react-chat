import { format } from "date-fns";
import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Image,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import chatbot from "./images/logo-chatbot.png";

const ChatLayout = ({ messages, endOfMessagesRef }) => {
  return (
    <Container className="p-0">
      {messages.map((msg, index) => (
        <div key={index} className="mb-3">
          {msg.sender === "bot" ? (
            <div className="d-flex align-items-start">
              <Image
                src={msg.avatar}
                roundedCircle
                style={{ width: "40px", height: "40px" }}
                className="me-2"
              />
              <div
                className="bg-primary text-white p-3 rounded"
                style={{ maxWidth: "350px", width: "max-content" }}
              >
                <div>{msg.text}</div>
                <div className="text-light small mt-1">
                  {format(new Date(msg.time), "MM-dd HH:mm a")}
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-row-reverse align-items-start">
              <div
                className="bg-secondary text-white p-3 rounded"
                style={{ maxWidth: "350px", width: "max-content" }}
              >
                <div>{msg.text}</div>
                <div className="text-light small mt-1 text-end">
                  {format(new Date(msg.time), "MM-dd HH:mm a")}
                </div>
              </div>
              <div
                style={{ width: "40px", height: "40px" }}
                className="me-2"
              ></div>{" "}
              {/* Placeholder for user avatar */}
            </div>
          )}
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </Container>
  );
};

const ChatPopover = () => {
  const endOfMessagesRef = useRef(null);

  const [showChat, setShowChat] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Xin chào! Tôi có thể giúp gì cho bạn?",
      time: "Sat Aug 17 2024 13:00:00 GMT+0700 (Giờ Đông Dương)",
      avatar: chatbot, // Link đến ảnh avatar của bot
    },
    {
      sender: "user",
      text: "Tôi muốn biết thêm thông tin về sản phẩm.",
      time: "Sat Aug 17 2024 13:00:30 GMT+0700 (Giờ Đông Dương)",
    },
  ]);

  const toggleChat = () => setShowChat(!showChat);
  const handleChangeText = ({ target }) => {
    setText(target.value);
  };
  const handleSendMessage = () => {
    setMessages((prev) => {
      const newMsg = text;
      setText("");
      return [
        ...prev,
        {
          sender: "user",
          text: newMsg,
          time: new Date(),
        },
      ];
    });
    handleScrollToEnd();
  };

  const handleScrollToEnd = () => {
    setTimeout(() => {
      endOfMessagesRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-end align-items-end vh-100"
    >
      <OverlayTrigger
        trigger="click"
        placement="top"
        show={showChat}
        overlay={
          <Popover
            id="chat-popover"
            className="w-100"
            style={{ maxWidth: "500px" }}
          >
            <Popover.Header as="h3">Trò chuyện với AI</Popover.Header>
            <Popover.Body>
              <div style={{ height: "300px", overflowY: "auto" }}>
                <ChatLayout
                  messages={messages}
                  endOfMessagesRef={endOfMessagesRef}
                />
              </div>
              <div className="d-flex align-items-center gap-2  mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tin nhắn..."
                  value={text}
                  onChange={handleChangeText}
                />

                <Button variant="outline-light" onClick={handleSendMessage}>
                  <i
                    className="fas fa-paper-plane text-primary"
                    style={{ fontSize: 20 }}
                  ></i>
                </Button>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="primary" className="mb-4 me-4" onClick={toggleChat}>
          <Image
            src={chatbot}
            roundedCircle
            style={{ width: "40px", height: "40px" }}
          />
        </Button>
      </OverlayTrigger>
    </Container>
  );
};

export default ChatPopover;
