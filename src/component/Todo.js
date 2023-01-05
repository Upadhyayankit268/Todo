import React, { useState } from "react";
import "./todo.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Todo = ({ id, name, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleDelete = () => {
    onDelete(id);
  };
  const fetchData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(users);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        sx={{
          minWidth: 600,
          m: 1,
          boxShadow: "5px 5px  #1976d2",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography>{id}.</Typography>
          <Typography>{name}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => fetchData()}
          >
            Details
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            delete
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            <Typography>Id: {users.id}</Typography>
            <Typography>Title: {users.title}</Typography>
            <Typography>UserId:{users.userId}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Todo;
