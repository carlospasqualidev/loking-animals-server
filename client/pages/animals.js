import React, { useEffect, useState } from "react";
import Head from "next/head";

import { AnimalCard } from "../components/AnimalCard";
import { Api } from "../api";

import { Container, Grid, Typography, Divider } from "@mui/material";

const Animals = (props) => {
  const [animalsList, setAnimalsList] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    setInterval(async () => {
      const animalsListResponse = await Api.get(
        "http://localhost:8080/api/backoffice/animals/list"
      );

      setAnimalsList(animalsListResponse?.data);

      const dashboardResponse = await Api.get(
        "http://localhost:8080/api/backoffice/animals/dashboard"
      );

      setDashboard(dashboardResponse.data);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Meus Animais</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h4"
          fontWeight="medium"
          style={{ marginBottom: 30, marginTop: 30 }}
        >
          Dashboard
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          fontWeight="medium"
          style={{ marginTop: 30 }}
        >
          Animais por local
        </Typography>
        <div style={{ ...styles.animalLocationContainer }}>
          {dashboard &&
            Object.keys(dashboard.AnimalsPerLocal).map((local) => {
              return (
                <Grid item style={{ ...styles.animalLocationCard }}>
                  {local}
                  <small style={{ fontSize: 40 }}>
                    {dashboard.AnimalsPerLocal[local]}
                  </small>
                </Grid>
              );
            })}
        </div>

        <Typography
          variant="h5"
          component="h5"
          fontWeight="medium"
          style={{ marginTop: 30 }}
        >
          Animais executando ação
        </Typography>

        <div style={{ ...styles.animalLocationContainer }}>
          {dashboard &&
            dashboard?.BreedsCount &&
            Object.keys(dashboard.BreedsCount).map((breed) => (
              <Grid item style={{ ...styles.animalLocationCard }}>
                {breed}
                <small style={{ fontSize: 40 }}>
                  {dashboard.BreedsCount[breed]}
                </small>
              </Grid>
            ))}
        </div>

        <Divider style={{ marginTop: 60, marginBottom: 40 }} />

        <Typography
          variant="h4"
          component="h4"
          fontWeight="medium"
          style={{ marginBottom: 30, marginTop: 30 }}
        >
          Meus Animais
        </Typography>

        <Grid container spacing={3}>
          {animalsList &&
            animalsList.map((animal) => (
              <AnimalCard animal={animal} key={animal?.id} />
            ))}
        </Grid>
      </Container>
    </>
  );
};

const styles = {
  animalLocationContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  animalLocationCard: {
    background: "#FAFAFA",
    border: "1px #EEEEEE solid",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default Animals;
