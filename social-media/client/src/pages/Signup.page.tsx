import { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSignUp } from "../services/mutations";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const { mutate, isError, isSuccess } = useSignUp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, name, password, profile: bio };

    mutate(user);
  };

  if (isError) {
    return (
      <p>There was an error with the form information please try again.</p>
    );
  }

  if (isSuccess) {
    setEmail("");
    setName("");
    setPassword("");
    setBio("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder=""
          value={password}
          minLength={5}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          required
          rows={3}
          placeholder=""
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Signup</Button>
    </Form>
  );
};
