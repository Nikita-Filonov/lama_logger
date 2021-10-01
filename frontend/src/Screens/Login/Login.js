import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useUsers} from "../../Providers/UsersProvider";


export const Login = () => {
  const {onLogin, errors} = useUsers()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container>
      <Row>
        <Col/>
        <Col xs={4}>
          <div className={'text-center'} style={{marginTop: '40%'}}>
            <h4>Lama Logger</h4>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={username}
                onChange={event => setUsername(event.target.value)}
                placeholder="Email"
              />
              {errors?.username && <Form.Text className={'text-danger'}>{errors.username}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
              />
              {errors?.password && <Form.Text className={'text-danger'}>{errors.password}</Form.Text>}
            </Form.Group>
            <Button
              variant="outline-primary"
              className={'w-100'}
              onClick={async () => await onLogin({username, password})}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col/>
      </Row>
    </Container>
  )
}
