import React from "react";
import Head from "next/head";

import { AnimalCard } from "../components/AnimalCard";
import { Api } from "../api";

import { Container, Grid, Typography, Divider } from "@mui/material";

const Animals = (props) => {
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
          {props?.data &&
            Object.keys(props?.data.dashboard.AnimalsPerLocal).map((local) => {
              return (
                <Grid item style={{ ...styles.animalLocationCard }}>
                  {local}
                  <small style={{ fontSize: 40 }}>
                    {props?.data.dashboard.AnimalsPerLocal[local]}
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
          {props?.data.dashboard.BreedsCount &&
            Object.keys(props?.data.dashboard.BreedsCount).map((breed) => (
              <Grid item style={{ ...styles.animalLocationCard }}>
                {breed}
                <small style={{ fontSize: 40 }}>
                  {props?.data.dashboard.BreedsCount[breed]}
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
          {props?.data.animalsList &&
            props?.data.animalsList.map((animal) => (
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

export async function getServerSideProps() {
  const animalsList = await Api.get(
    "http://localhost:8080/api/backoffice/animals/list"
  )
    .then((res) => {
      return res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  const animalsPerLocal = await Api.get(
    "http://localhost:8080/api/backoffice/animals/dashboard"
  )
    .then((res) => {
      return res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      data: {
        dashboard: animalsPerLocal,
        animalsList,
      },
    },
  };
}

export default Animals;
