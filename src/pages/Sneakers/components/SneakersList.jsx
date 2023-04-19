import React from "react";
import { Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

function SneakersList({ currentSneakers }) {
  const navigate = useNavigate();
  return (
    <Grid container spacing={4}>
      {currentSneakers.map((snk) => {
        const imageClickHandler = () => {
          navigate(snk.slug);
        };

        return (
          <Grid item xs={4} key={snk.id}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="220"
                image={`http://localhost:3000/images/sneakers/${snk.id}/${snk.coverImage}`}
                onClick={imageClickHandler}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {snk.brand.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {snk.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {snk.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SneakersList;
