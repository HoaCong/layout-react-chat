import { format } from "date-fns";
import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
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
                className="bg-primary text-white p-2 rounded-4"
                style={{ maxWidth: "350px", width: "max-content" }}
              >
                <div>{msg.text}</div>
                <div className="text-light small mt-1">
                  {format(new Date(msg.time), "HH:mm")}
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-row-reverse align-items-start">
              <div
                className="bg-secondary text-white p-2 rounded-4"
                style={{ maxWidth: "350px", width: "max-content" }}
              >
                <div>{msg.text}</div>
                <div className="text-light small mt-1 text-end">
                  {format(new Date(msg.time), "HH:mm")}
                </div>
              </div>
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
      text: "Xin chào! Tôi có thể tư vấn cho bạn ngay bây giờ.",
      time: new Date(),
      avatar: chatbot, // Link đến ảnh avatar của bot
    },
    // {
    //   sender: "user",
    //   text: "Tôi muốn biết thêm thông tin về sản phẩm.",
    //   time: new Date(),
    // },
  ]);

  const toggleChat = () => setShowChat(!showChat);
  const handleChangeText = ({ target }) => {
    setText(target.value);
  };
  const handleSendMessage = () => {
    if (!!text) {
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
    }
  };

  const handleScrollToEnd = () => {
    setTimeout(() => {
      endOfMessagesRef.current.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }, 50);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container fluid>
      <OverlayTrigger
        trigger="click"
        placement="top"
        show={showChat}
        overlay={
          <Popover
            id="chat-popover"
            // className="w-100"
            style={{ maxWidth: "500px", width: "97%" }}
          >
            <Popover.Header as="h3">Trò chuyện với AI</Popover.Header>
            <Popover.Body className="p-2">
              <div style={{ height: "300px", overflowY: "auto" }}>
                <ChatLayout
                  messages={messages}
                  endOfMessagesRef={endOfMessagesRef}
                />
              </div>
              <div className="d-flex align-items-center gap-2 mt-2">
                <Form.Control
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={text}
                  onChange={handleChangeText}
                  onKeyDown={handleKeyPress}
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
        <Button
          variant="primary"
          className="position-fixed end-0 bottom-0 me-3 mb-3 p-2"
          onClick={toggleChat}
        >
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
