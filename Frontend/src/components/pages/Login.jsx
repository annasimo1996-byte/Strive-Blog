import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'; // Aggiunto per mostrare l'errore in stile Bootstrap
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginPage = ({ setIsLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Cambiato in stringa per mostrare il messaggio dinamico del server
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const oauthError = searchParams.get("oauthError");

    if (token) {
      localStorage.setItem("token", token);
      setIsLogged(true);
      navigate("/");
    } else if (oauthError === "google") {

      setError("Si è verificato un errore durante l'accesso con Google. Riprova.");
    }
  }, [searchParams, navigate, setIsLogged]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");


    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenziali non valide o errore di rete');
      }

      localStorage.setItem("token", data.accessToken);

      setIsLogged(true);
      navigate("/"); 

    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVERURL}/auth/google`;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Accedi al Blog</h2>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">
          Accedi
        </Button>
      </Form>

      {/* Pulsante aggiuntivo per l'accesso con Google */}
      <Button variant="outline-danger" onClick={handleGoogleLogin} className="w-100">
        Accedi con Google
      </Button>
    </div>
  );
};

export default LoginPage;