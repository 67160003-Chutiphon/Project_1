import { useState } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch";

// แสดงรายการโพสต์ พร้อมระบบค้นหา โหลดใหม่ และแบ่งหน้า (Pagination)
function PostList() {
  const { data: posts, loading, error, refetch } = useFetch("https://jsonplaceholder.typicode.com/posts");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // เก็บหน้าปัจจุบัน สำหรับ Pagination

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  // กรองโพสต์จากคำค้นหา (ถ้ามี)
  const filtered = posts ? posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  ) : [];

  // การแบ่งหน้า: แสดงหน้าละ 10 รายการ
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  // ตัด array เอาแค่โพสต์ในหน้าที่กำลังจะแสดง
  const currentPosts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
        <h2 style={{ color: "#2d3748", margin: 0 }}>
          โพสต์ล่าสุด
        </h2>
        {/* ปุ่มสำหรับโหลดข้อมูลใหม่ (Challenge 1) */}
        <button 
          onClick={() => {
            setCurrentPage(1); // รีเซ็ตไปหน้าแรก
            refetch(); // เรียกดึงข้อมูลใหม่
          }}
          style={{
            padding: "0.4rem 0.8rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            background: "white",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#4a5568"
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // ค้นหาใหม่ ให้กลับไปหน้าแรก
        }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {currentPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* ส่วนควบคุมการแบ่งหน้า (Pagination - Challenge 2) */}
      {totalPages > 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ padding: "0.5rem 1rem", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1, borderRadius: "6px", border: "1px solid #cbd5e0", background: "white", color: "#4a5568" }}
          >
            ← ก่อนหน้า
          </button>
          
          <span style={{ color: "#4a5568", fontWeight: "bold" }}>หน้า {currentPage} / {totalPages}</span>
          
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ padding: "0.5rem 1rem", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1, borderRadius: "6px", border: "1px solid #cbd5e0", background: "white", color: "#4a5568" }}
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
