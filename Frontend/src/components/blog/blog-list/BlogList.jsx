import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = props => {

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/blogPosts?page=${currentPage.toString()}`);

        if (!response.ok) throw new Error("Errore nel caricamento dei post");

        const posts = await response.json();
        console.log(posts)

        const cleanPosts = posts.data.map(post => ({
          ...post,
          author: typeof post.author === 'object' && post.author !== null
            ? post.author
            : { name: post.author || "Autore Anonimo", avatar: "https://picsum.photos/50/50" }
        }));

        setBlogPosts(cleanPosts);
        setTotalPages(posts.totalPages || 1);

      } catch (error) {
        console.error("Errore fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

  }, [currentPage]);


  return (
    <>
      <Row>
        {blogPosts.map((post, i) => (
          <Col
            key={`item-${post._id || i}`}
            md={4}
            style={{ marginBottom: 50 }}
          >
            <BlogItem {...post} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center align-items-center mt-4 mb-5 gap-3">
        <Button
          variant="dark"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(e => e - 1)}
        >
          Precedente
        </Button>

        <span className="fw-bold">
          Pagina {currentPage} di {totalPages}
        </span>

        <Button
          variant="dark"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(e => e + 1)}
        >
          Successivo
        </Button>
      </div>
    </>
  );
};

export default BlogList;