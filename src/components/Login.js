import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Login = ({ dispatch, kanal }) => {
  const logirajSe = () => {
    let uneseno = document.getElementById("nickname-unos").value;
    kanal.trigger("client-login", uneseno);
    dispatch({
      type: "LOGIRANJE_OSOBE",
      payload: uneseno,
    });
    return <Redirect to='/' />;
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
