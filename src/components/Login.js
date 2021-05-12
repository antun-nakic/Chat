import React from "react";
import { Form, Button } from "react-bootstrap";

const Login = ({ dispatch }) => {
  const logirajSe = () => {
    let uneseno = document.getElementById("nickname-unos").value;
    dispatch({
      type: "LOGIRANJE_OSOBE",
      payload: uneseno,
    });
  };
  return (
    <Form style={{ textAlign: "center" }}>
      <Form.Group>
        <Form.Label>Unesite Korisničko ime</Form.Label>
        <Form.Control
          type='text'
          placeholder='Unesite nickname'
          id='nickname-unos'
        />
        <Form.Text className='text-muted'>Vodit ćemo računa o GDPR-u</Form.Text>
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        style={{ marginTop: "20px" }}
        onClick={logirajSe}>
        Uđi u chat sobu
      </Button>
    </Form>
  );
};

export default Login;
