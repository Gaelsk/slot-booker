import React from "react";
import { Form } from "react-bootstrap";
export default function SearchForm({ query, onQueryChange }) {
  return (
    <Form>
      <Form.Group>
        <Form.Control
          placeholder="Search by name or surname"
          value={query}
          onChange={onQueryChange}
        ></Form.Control>
      </Form.Group>
    </Form>
  );
}
