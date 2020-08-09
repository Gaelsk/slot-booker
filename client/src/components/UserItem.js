import React, { useState } from "react";
import {
  Card,
  Image,
  Button,
  Modal,
  ModalBody,
  Alert,
  Form
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function UserItem({ user }) {
  const fullname = `${user.first_name} ${user.last_name}`;
  const [show, setshow] = useState(false);
  const [message, setMessage] = useState("");
  const [bookedFor, setBookedFor] = useState(new Date());
  function openModal() {
    setshow(true);
  }
  function closeModal() {
    setshow(false);
  }
  function handleBook() {
    const data = {
      user,
      booked: true,
      bookedFor
    };
    axios.post("/bookings", data).then(res => {
      setMessage("Slot booked successfully!");
      setTimeout(() => {
        setMessage("");
      }, 4000);
    });
  }

  return (
    <>
      <Card className="mb-3 bg-white">
        <Card.Body>
          <Image
            roundedCircle
            height="50"
            width="50"
            className="mr-3"
            src={user.avatar}
          />
          {fullname}
          <Button className="float-right mt-2" onClick={openModal}>
            More
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={closeModal}>
        {message && (
          <Alert translate="yes" variant="success">
            {message}
          </Alert>
        )}
        <ModalHeader closeButton>
          <div className="lead font-weight-bold">Book a slot</div>
        </ModalHeader>
        <ModalBody className="bg-white d-flex align-items-center">
          <Image roundedCircle height="90" src={user.avatar} />
          <div className="ml-3">
            <div>{fullname}</div>
            <div className="text-black-50">{user.email}</div>
          </div>
        </ModalBody>
        <Form.Group>
          <DatePicker
            className="ml-3 px-3 py-1 date-picker-input"
            selected={bookedFor}
            onChange={date => setBookedFor(date)}
          />
          <Button className="ml-3 mb-1 book-submit-btn" onClick={handleBook}>
            Book
          </Button>
        </Form.Group>
      </Modal>
    </>
  );
}
