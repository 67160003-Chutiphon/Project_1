import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "../components/CommentList";
import LoadingSpinner from "../components/LoadingSpinner";

// PostDetailPage: คอมโพเนนต์ทำหน้าที่เป็นหน้าหน้าแสดงรายละเอียดเต็มๆ ของ 1 โพสต์
// เชื่อมต่อไปยัง: App.jsx (Route /posts/:id) 
function PostDetailPage() {
  
  // id: ตัวแปรสกัดมาจาก URL ปัจจุบันผ่าน Hook useParams()
  // เช่น ถ้าเบราว์เซอร์โชว์ URL /posts/5 ค่าของ id ก็คือ "5" (String)
  // ถูกนำไปใช้ต่อท้าย API Endpoint เพื่อดึงโพสต์หมายเลข 5
  const { id } = useParams(); 
  
  // favorites, toggleFavorite: สกัดออกมาจาก Context API 
  // อาศัยเอาไว้เช็คว่าโพสต์นี้ถูกใจไว้หรือยัง (favorites) และเปลี่ยนสถานะเมื่อกดปุ่มถูกใจ (toggleFavorite)
  const { favorites, toggleFavorite } = useFavorites();
  
  // post: State ตัวแปรทำหน้าที่เก็บก้อนออบเจ็กต์ข้อมูลของ 1 โพสต์ ค่าเริ่มต้นคือ null สื่อว่าไม่มีโพสต์ให้โชว์ตอนแรก
  // setPost: ฟังก์ชันเขียนทับอัปเดตค่า post 
  const [post, setPost] = useState(null);
  
  // loading: State ตัวแปรเช็คว่ากำลังโหลดอยู่ไหม จริง/เท็จ 
  // setLoading: เอาไว้สับสวิตช์หน้า LoadingSpinner
  const [loading, setLoading] = useState(true);

  // useEffect (Side effect): ดักจับทุกครั้งที่หน้าถูกเข้าถึงใหม่ หรือ URL param `id` เปลี่ยนแปลง ให้รีโหลดโพสต์
  useEffect(() => {
    // fetchPost: ฟังก์ชันดึงรายละเอียดของโพสต์ 1 ตัวจาก Backend 
    async function fetchPost() {
      // res: ตัวแปรพัก Response เมื่อ fetch เรียก API 
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      // data: จัดรูปแบบ Response เป็น JavaScript Object เอาไปใช้หน้าเว็บ
      const data = await res.json();
      
      // ดึงสำเร็จก็อัปเดตลง state post และปิดตัวแปร loading (false)
      setPost(data);
      setLoading(false);
    }
    
    // สั่งให้ฟังก์ชัน fetchPost เริ่มทำงานด้านหลังฉาก
    fetchPost();
  }, [id]); // [id] dependency สั่งให้ยิง API ใหม่ถ้าค่า id หมายเลขท้าย URL เปลี่ยน

  if (loading) return <LoadingSpinner />;

  // isFavorite: ตัวแปร Boolean ทำหน้าที่เช็ค (ตรวจสอบ) ในตะกร้าชื่นชอบ (favorites) ของระบบ Context
  // ถามว่ามันมีรหัส post.id บรรจุอยู่ข้างในนั้นด้วยหรือไม่ (includes) ถ้ามีคืนค่าจริง (true)
  const isFavorite = favorites.includes(post.id);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <Link to="/" style={{ color: "#1e40af", textDecoration: "none" }}>
        ← กลับหน้าหลัก
      </Link>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.5rem",
          margin: "1rem 0",
          background: "white",
        }}
      >
        <h2 style={{ margin: "0 0 1rem", color: "#1e40af" }}>{post.title}</h2>
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{post.body}</p>

        {/* ปุ่มถูกใจ / ยกเลิก ผูกเข้ากับฟังก์ชัน toggleFavorite ใน Context ให้ส่งรหัสโพสต์ไปทำงาน */}
        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0", // ควบคุมสีแดง/เทา โดยตัวแปร isFavorite
          }}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      {/* เรียกใช้งาน CommentList สำหรับโพสต์นี้ โดยส่งหมายเลข post.id ผ่าน Props ปลายทาง */}
      <CommentList postId={post.id} />
    </div>
  );
}

export default PostDetailPage;
