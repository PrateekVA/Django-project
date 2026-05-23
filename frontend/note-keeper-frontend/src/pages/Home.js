import { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/notes/?user_id=${userId}`
    );
    setNotes(response.data);
  };

  const createNote = async () => {
    if (!content) return;

    await axios.post("http://127.0.0.1:8000/api/notes/create/", {
      user_id: userId,
      content,
    });

    setContent("");
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
      }}
    >
      <Box sx={{ width: 500 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h5">My Notes</Typography>
          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Write a note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={createNote}
        >
          Add Note
        </Button>

        <Box sx={{ mt: 3 }}>
          {notes.length === 0 && (
            <Typography>No notes yet</Typography>
          )}

          {notes.map((note) => (
            <Typography key={note.id} sx={{ mt: 1 }}>
              • {note.content}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
