import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage() {
  // ดึง query params จาก URL, ตัวอย่าง: URL /search?q=react จะได้ searchParams.get("q") === "react"
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || ""; // ได้คำค้นหา ถ้าไม่มีค่าเริ่มต้นจะเป็น ""

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // ดึงข้อมูล post ทั้งหมดมาเก็บไว้เพื่อกรองเมื่อ search value มีการเปลี่ยนแปลง
  useEffect(() => {
    async function fetchAllPosts() {
      setLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPosts();
  }, []);

  // กรองโพสต์ที่ข้อความมีคำที่ผู้ใช้ค้นหาอยู่ใน title หรือ body
  // ใช้ .toLowerCase() เพื่อให้การค้นหาครอบคลุมตัวพิมพ์เล็ก-ใหญ่ ไม่แคร์เคส
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2 style={{ color: "#2d3748", borderBottom: "2px solid #3182ce", paddingBottom: "0.5rem" }}>
        🔍 ผลการค้นหาสำหรับ: "{query}"
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div style={{ textAlign: "center", padding: "2rem", color: "#718096" }}>
          <p style={{ fontSize: "1.1rem" }}>ไม่พบโพสต์ที่ตรงกับคำค้นหาของคุณ</p>
          <Link to="/" style={{ color: "#1e40af", display: "inline-block", marginTop: "1rem" }}>
            ← กลับไปดูเนื้อหาทั้งหมดที่หน้าหลัก
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
