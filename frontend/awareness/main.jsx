import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const videos = [
  "https://www.youtube.com/embed/_DRz3TNJU2A",
  "https://www.youtube.com/embed/5b0CHH7d9To",
  "https://www.youtube.com/embed/jF7lZg6gii0",
  "https://www.youtube.com/embed/q8md6TjqvUM",
  "https://www.youtube.com/embed/YW0HDQkyUQY",
  "https://www.youtube.com/embed/x93sLkZTLkg",
  "https://www.youtube.com/embed/6DcSz0hW7jY",
  "https://www.youtube.com/embed/LZr_cSUZxJo",
  "https://www.youtube.com/embed/_LS_RMHVDtw",
  "https://www.youtube.com/embed/ZJHRDgTWSgs"
];

const AwarenessApp = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("https://backend-1-h7od.onrender.com/api/news");
      const data = await res.json();

      if (!data.articles || !Array.isArray(data.articles)) {
        console.error("Invalid NewsAPI response:", data);
        return;
      }

      setBlogs(data.articles.slice(0, 10));
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    const interval = setInterval(fetchBlogs, 12 * 60 * 1000); // every 12 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>🚗 Alcohol Detection Awareness</h1>
      {blogs.map((blog, index) => (
        <div key={index} className="card">
          <iframe
            src={videos[index % videos.length]}
            title={`Awareness Video ${index}`}
            allowFullScreen
          ></iframe>
          <img src={blog.urlToImage} alt="Thumbnail" />
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <a href={blog.url} target="_blank" rel="noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<AwarenessApp />);
