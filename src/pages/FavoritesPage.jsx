import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

// FavoritesPage: คอมโพเนนต์ทำหน้าที่เป็นหน้ากระดานแสดงโพสต์ทั้งหมดที่ผู้ใช้เคยกดถูกใจไว้
// เชื่อมต่อไปยัง: เรียกใช้โดย App.jsx เมื่อเบราว์เซอร์เข้าสู่พาร์ท /favorites
function FavoritesPage() {
  
  // favorites: ตัวแปรอาเรย์เก็บชุด ID โพสต์ที่ถูกใจ ดึงมาจาก Context โดยตรง
  // toggleFavorite: ฟังก์ชันที่ดึงมาจาก Context เช่นกัน เอาไว้จัดการลบโพสต์ออกจากหน้านี้เมื่อเปลี่ยนใจ
  const { favorites, toggleFavorite } = useFavorites();
  
  // posts: State ตัวแปรอาเรย์ (Array of Objects) ทำหน้าที่เก็บความสมบูรณ์ของโพสต์ (มีทั้ง title, body) ที่แปลงมาจาก ID ใน favorites
  // setPosts: ฟังก์ชันอัปเดตค่าของ posts เพื่อนำไปวนลูปแสดงบนหน้าจอ
  const [posts, setPosts] = useState([]);

  // useEffect (Side effect): ทำงานเมื่อ favorites เปลี่ยนแปลง เพื่อดึงข้อมูลโพสต์ล่าสุดทั้งหมดมาโชว์
  useEffect(() => {
    // เงื่อนไข: ถ้าไม่มีรายการโปรด (length = 0) ไม่ต้องทำ fetch API ต่อ เพื่อประหยัดเวลาและทรัพยากร
    if (favorites.length === 0) return;

    // fetchFavoritePosts: ฟังก์ชัน Asynchronous ดึงข้อมูลโพสต์ที่ถูกใจแบบขนาน
    async function fetchFavoritePosts() {
      // results: ตัวแปรที่เก็บผลลัพธ์ของ Promise.all ซึ่งเป็นการทำงานแบบยิง Request ไปพร้อมๆ กัน (Parallel) ตามจำนวน favorites
      // อาศัย array.map ถอด ID แต่ละตัวไปประกอบร่างเป็น URL แล้ว fetch เพื่อดึง .json() 
      const results = await Promise.all(
        favorites.map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
            r.json(),
          ),
        ),
      );
      
      // เมื่อดึงและแกะข้อมูลทั้งหมดเสร็จเรียบร้อย ก็นำตัวแปร results ไปยัดใส่ state posts เพื่อทำการ Render
      setPosts(results);
    }
    
    // เรียกใช้ฟังก์ชันทันทีที่กำหนดเสร็จ
    fetchFavoritePosts();
  }, [favorites]); // หาก array ของ favorites มีจำนวนเปลี่ยนไป (เช่นโดนลบ) useEffect ตัวนี้จะรันใหม่ทำงานใหม่ทันที

  // เงื่อนไขการ Render #1: ถ้าไม่มีรายการที่ชอบอยู่เลย หรือลบจนหมดแล้ว ให้โชว์หน้าจอมืดๆ มีลิงก์พาชิ่งกลับหน้าหลัก
  if (favorites.length === 0) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          ยังไม่มีโพสต์ที่ถูกใจ
        </p>
        <Link to="/" style={{ color: "#1e40af" }}>
          ← กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  // เงื่อนไขการ Render #2: ในกรณีที่มีของอยู่ใน posts (มีถูกใจอย่างน้อย 1 รายการ) ให้แสดงโครงสร้างตามปกติ
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #e53e3e",
          paddingBottom: "0.5rem",
        }}
      >
        ❤️ โพสต์ที่ถูกใจ ({favorites.length})
      </h2>
      
      {/* วนลูปอาเรย์ posts (ผลลัพธ์จาก API) ดึงออบเจ็กต์โพสต์ออกมาสร้างบล็อกการ์ดแสดงผลทีละอัน */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>
            <Link
              to={`/posts/${post.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {post.title}
            </Link>
          </h3>
          <p style={{ margin: "0 0 0.75rem", color: "#4a5568" }}>{post.body}</p>
          
          <button
            // ปุ่มกดยกเลิก หัวใจ (Unlike) 
            // จะไปเรียก toggleFavorite จาก Hook Context พอ Context โดนตัด ตัวแปร favorites เปลี่ยน length 
            // useEffect ด้านบนก็จะทำงาน ส่งผลให้ Render #1 ด้านบนดีดหน้าลบโพสต์ทิ้งไปทันที (Realtime Remove)
            onClick={() => {
              toggleFavorite(post.id);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e53e3e",
              fontSize: "0.9rem",
            }}
          >
            ❤️ ยกเลิกถูกใจ
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
