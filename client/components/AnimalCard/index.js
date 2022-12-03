import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Typography, Grid } from "@mui/material";

export const AnimalCard = ({ animal }) => {
  return (
    <Link href={`/animal/${animal?.id}`}>
      <Grid item xs={3} style={{ cursor: "pointer" }}>
        <Image
          src={animal?.image}
          quality={100}
          width={1000}
          height={500}
          objectFit="cover"
          style={{ ...imageStyle }}
        />

        <Typography
          variant="h5"
          component="h5"
          color="#4B4B4B"
          style={{ marginTop: 10 }}
        >
          {animal?.Breed}
        </Typography>

        <Typography variant="small" component="small" color="#999999">
          #{animal?.id}
        </Typography>
      </Grid>
    </Link>
  );
};

const imageStyle = {
  borderRadius: 5,
};
