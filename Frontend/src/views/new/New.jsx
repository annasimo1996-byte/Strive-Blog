import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
import { convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useNavigate } from "react-router-dom";

const NewBlogPost = props => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Lifestyle");
  const [authorName, setAuthorName] = useState("");
  const [coverUrl, setCoverUrl] = useState(null);
  const [readTimeValue, setReadTimeValue] = useState(1);

  const handleChange = useCallback(value => {
    setText(draftToHtml(value));
    console.log(text)
    // console.log(convertToRaw(value.getCurrentContent()))
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !text || text.trim() === "<p></p>") {
      alert("Inserisci un titolo e un contenuto prima di inviare!");
      return;
    }

    const nuovoPost = {
      title: title,
      category: category,
      content: text,
      cover: "",
      readTime: {
        value: Number(readTimeValue),
        unit: "minuti"
      }
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/blogPosts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(nuovoPost),
      });

      if (response.ok) {

        const savedPost = await response.json()

        if (coverUrl) {
          const formData = new FormData()
          formData.append("cover", coverUrl)

          const coverResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/blogPosts/${savedPost._id}/cover`, {
            method: "PATCH",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData
          })
          
          if (!coverResponse.ok) {
            throw new Error("Caricamenti cover non riuscita")
          }
        }


        alert("Post creato con successo!");
        navigate("/");
      } else {
        const erroreServer = await response.json();
        alert(`Errore del server: ${erroreServer.message || "Impossibile salvare il post"}`);
      }
    } catch (error) {
      console.error("Errore durante la fetch POST:", error);
      alert("Errore di rete: controlla che il server backend sia acceso!");
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>

        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </Form.Group>
        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Email o Nome Autore</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Es: test33@gmail.com"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </Form.Group>

        {/*<Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>URL Immagine di Copertina</Form.Label>
          <Form.Control
            size="lg"
            type="file"
            accept="image/*"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.files)}
          />
        </Form.Group>*/}

        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Carica un immagine</Form.Label>
          <Form.Control
            name="cover"
            size="lg"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverUrl(e.target.files?.[0])}
          />
        </Form.Group>

        <Form.Group controlId="blog-readtime" className="mt-3">
          <Form.Label>Tempo di lettura (in minuti)</Form.Label>
          <Form.Control
            size="lg"
            type="number"
            min="1"
            value={readTimeValue}
            onChange={(e) => setReadTimeValue(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Lifestyle</option>
            <option>Carriera</option>
            <option>Design</option>
            <option>Tech</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Testo del Blog</Form.Label>

          <Editor value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
