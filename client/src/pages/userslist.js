import React, { useState, useEffect } from "react";
import { Container, Card, Alert } from "react-bootstrap";
import UserItem from "../components/UserItem";
import useFetchUsers from "../hooks/useFetchUsers";
import SearchForm from "../components/SearchForm";

function UsersList() {
  const [query, setQuery] = useState("");
  const { users, loading, error } = useFetchUsers();
  const [users_list, setUsers_list] = useState(users);
  function handleQueryChange(e) {
    setQuery(e.target.value);
  }
  useEffect(() => {
    setUsers_list(users);
  }, [users]);

  useEffect(() => {
    const matched_users = users.filter(user => {
      const regExp = new RegExp(query, "gi");
      return user.first_name.match(regExp) || user.last_name.match(regExp);
    });
    setUsers_list(matched_users);
  }, [query]);

  function renderNotFoundMessage() {
    if (query.length > 0 && users_list.length == 0) {
      return <div>User not found</div>;
    }
  }
  return (
    <Container style={{ maxWidth: 700 }} className="my-4">
      <h1 className="mb-4 title">Users List</h1>
      <SearchForm query={query} onQueryChange={handleQueryChange} />
      {renderNotFoundMessage()}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {loading && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="mb-3" style={{ padding: "2rem" }} />
          ))}
        </>
      )}
      {users_list.map((user, i) => (
        <UserItem key={i} user={user} />
      ))}
    </Container>
  );
}
export default UsersList;
