// src/components/CategoryManagement.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newCategory }),
        }
      );
      if (response.ok) {
        setNewCategory("");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Manage Categories
      </Typography>
      <TextField
        label="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button onClick={handleAddCategory}>Add Category</Button>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleDeleteCategory(category._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CategoryManagement;
