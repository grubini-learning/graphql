import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useSignIn } from "../services/mutations";
import { User, UserErrors } from "../types";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, data, isSuccess, reset } = useSignIn();

  const res = data as { signIn: { userErrors: UserErrors[] } };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Pick<User, "email" | "password"> = { email, password };
    mutate({ ...user });
    setEmail("");
    setPassword("");
  };

  if (isSuccess && res.signIn.userErrors?.length > 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ul>
          {res.signIn.userErrors.map((error, idx) => (
            <li key={idx}>{error.message}</li>
          ))}
        </ul>
        <button onClick={reset}>Try again</button>
      </div>
    );
  }

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Signin</Button>
    </Form>
  );
};
