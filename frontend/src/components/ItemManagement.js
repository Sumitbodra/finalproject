// src/components/ItemManagement.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/products");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

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

  const handleAddItem = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        fetchItems();
        setNewItem({ name: "", price: "", category: "", description: "" });
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdateItem = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/products/${editingItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        }
      );
      if (response.ok) {
        fetchItems();
        setEditingItem(null);
        setNewItem({ name: "", price: "", category: "", description: "" });
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Manage Items
      </Typography>
      <TextField
        label="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <TextField
        label="Price"
        type="number"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <Select
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <Button onClick={editingItem ? handleSaveEdit : handleAddItem}>
        {editingItem ? "Save Edit" : "Add Item"}
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateItem(item)}>Edit</Button>
                  <Button onClick={() => handleDeleteItem(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ItemManagement;
