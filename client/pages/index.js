import React, { useState } from "react";
import Link from "next/link";

import { Logo } from "../components/Logo";

import { Container, Box, Typography, TextField, Button } from "@mui/material";

import { authInputs } from "../helpers/inputs/auth";

import { styles } from "../styles";

export default function Home() {
  const [authForm, setAuthForm] = useState({});

  const handleFormFields = (input, value) => {
    const newFormField = { [input.label]: value };

    setAuthForm({ ...authForm, ...newFormField });
  };

  return (
    <Container maxWidth="sm" style={{ ...styles.container }}>
      <Box sx={{ ...styles.logo }}>
        <Logo width={100} height={100} />
      </Box>

      <Typography variant="h4" component="h5" textAlign="center">
        Animals Tracker
      </Typography>

      <Box sx={{ ...styles.form }}>
        {authInputs.map((input) => (
          <TextField
            id={input.label}
            label={input.label}
            type={input.type}
            color="success"
            style={{ marginBottom: 20 }}
            autoComplete="off"
            onChange={(e) => handleFormFields(input, e.target.value)}
          />
        ))}

        <Link href="/animals">
          <Button
            variant="contained"
            color="success"
            size="large"
            disableElevation
          >
            Entrar
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
