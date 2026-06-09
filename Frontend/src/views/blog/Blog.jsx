import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
const Blog = props => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const blog = async () => {
      try {

        setLoading(true);

        const response = await fetch(`http://localhost:9999/blogPosts?page=1`);

        if (!response.ok) throw new Error("Errore nel caricamento dei post");

        const posts = await response.json();
        console.log(posts)

        const cleanPosts = posts.data.map(post => ({
          ...post,
          author: typeof post.author === 'object' && post.author !== null
            ? post.author
            : { name: post.author || "Autore Anonimo", avatar: "https://picsum.photos/50/50" }
        }));

        setBlog(cleanPosts);
      } catch (err) {
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    }

    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
