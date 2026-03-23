import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import CommentList from "./CommentList";

// PostCard: คอมโพเนนต์ทำหน้าที่เป็นโครงสร้าง UI แบบการ์ดเพื่อแสดงเนื้อหา 1 โพสต์
// เชื่อมต่อไปยัง: PostList, PostDetailPage, SearchPage, FavoritesPage (ถูกเรียกซ้ำๆ ในรายการ)
// ตัวแปร post (Props): ออบเจ็กต์เก็บข้อมูล 1 โพสต์ที่แม่ทะลุลงมาให้ (ข้างในมีรหัส id, ชื่อโพสต์ title, เนื้อหา body)
function PostCard({ post }) {
  // favorites และ toggleFavorite: ตัวแปรสกัดมาจาก Hook useFavorites() 
  // favorites ไว้ใช้อ้างอิงตรวจสอบ ส่วน toggleFavorite ไว้เรียกใช้งานตอนกดปุ่มหัวใจ 
  // เชื่อมต่อไปยัง: FavoritesContext เพื่อดึงและเปลี่ยนแปลง State กลางของแอป
  const { favorites, toggleFavorite } = useFavorites();
  
  // isFavorite: ตัวแปร Boolean ที่คืนค่า true เมื่อรหัสโพสต์ (post.id) นี้มีปรากฏอยูในกระเป๋า favorites
  // เพื่อเอาไปเช็คแสดงผลไอคอนหัวใจ (❤️ แสดงว่าชอบแล้ว / 🤍 แสดงว่ายังไม่ชอบ)
  const isFavorite = favorites.includes(post.id);

  // showComments: State ตัวแปร Boolean ทำหน้าที่เป็นสวิตช์เปิด-ปิด โซนแสดงความคิดเห็น ว่าตอนนี้แสดงอยู่ (true) หรือไม่ (false)
  // setShowComments: ฟังก์ชันสำหรับสับสวิตช์ค่าข้างต้น
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>
        {/* Link: สร้างลิงก์ครอบชื่อโพสต์ เพื่อให้ผู้ใช้กดเข้าไปอ่านหน้ารายละเอียดแบบเต็มๆ (เชื่อมต่อไป PostDetailPage) */}
        <Link
          to={`/posts/${post.id}`}
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title}
        </Link>
      </h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* ปุ่ม Favorite (รูปหัวใจ) ทำการคล้อง onClick ไว้กับฟังก์ชัน toggleFavorite */}
        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0", // สลับสีตามตัวแปร Boolean isFavorite
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* ปุ่มแสดงความคิดเห็น: เมื่อคลิกจะเรียก setShowComments เพื่อสลับค่า (prev) เป็นค่าตรงข้าม (!prev) */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {/* แสดงคำว่า ซ่อน หรือ ความคิดเห็น ตามสถานะ showComments */}
          {showComments ? "▲ ซ่อน" : "▼ ความคิดเห็น"}
        </button>
      </div>

      {/* ถ้าเงื่อนไข showComments เป็นจริง ถึงจะเรนเดอร์คอมโพเนนต์ CommentList ออกมาให้เห็น */}
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
