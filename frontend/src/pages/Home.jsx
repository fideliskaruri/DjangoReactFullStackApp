import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import '../styles/Home.css';


export default function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");


    useEffect(() => {
        getNotes();
    }, [])


    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data); })
            .catch((error) => alert(error));
    }


    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status == 204) alert("note deleted");
                else alert("Failed to delete note");
                getNotes();

            })
            .catch((error) => alert(error));
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status == 201) { alert("note created"); setContent(""); setTitle(""); }
                else { alert("failed to make note"); }
                getNotes();

            })
            .catch((error) => {
                alert(err)
            })
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note, index) => <Note key={index} note={note} onDelete={deleteNote} />)}
        </div>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea type="text" id="content" name="content" required onChange={(e) => setContent(e.target.value)} value={content} />

            <input type="submit" value={"Submit"} />
        </form>
    </div>
}