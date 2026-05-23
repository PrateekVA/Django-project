import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        { username, password }
      );
      setMessage(response.data.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Server not reachable or CORS issue");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: 350,
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Register
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button variant="contained" fullWidth onClick={handleRegister}>
          Register
        </Button>

        {message && (
          <Typography
            align="center"
            color={message.includes("success") ? "green" : "red"}
          >
            {message}
          </Typography>
        )}

        <Typography align="center" variant="body2">
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
