// frontend/src/components/Categories.js
import React from "react";
import { Button, Typography, Grid } from "@mui/material";

const categories = ["Sports", "Casual", "Formal"];

const Categories = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={4} key={category}>
            <Button variant="outlined" fullWidth>
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
