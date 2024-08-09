// frontend/src/components/Categories.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <Grid container spacing={4}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category._id}>
          <Card
            component={Link}
            to={`/category/${category.name}`}
            style={{ textDecoration: "none" }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
