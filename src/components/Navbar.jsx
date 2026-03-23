// นำเข้า <Link> คอมโพเนนต์ทำหน้าเหมือนแท็ก <a href=""> แต่ทำงานผ่านระบบ SPA โดยไม่โหลดหน้าใหม่
import { Link } from "react-router-dom";
// นำเข้า useFavorites ฮุกสำหรับดึงค่าและฟังก์ชันจาก FavoritesContext
import { useFavorites } from "../context/FavoritesContext";

// Navbar: คอมโพเนนต์กล่องแถบด้านบนสุด (Header / Navigation Bar) 
// เชื่อมต่อไปยัง: นำไปสวมใน App.jsx ทำให้โชว์แท็บด้านบนของทุกหน้า
function Navbar() {
  // favorites: ตัวแปรอาเรย์ (Array) ที่สกัดออกมาจากผลลัพธ์ของฟังก์ชัน useFavorites() ผ่านโครงสร้างหนีบ (Destructuring)
  // หน้าที่: ใช้เพื่อวัดขนาด (count length) ของรายการโปรดที่เก็บไว้ นำไปแสดงผลให้ผู้ใช้เห็นว่าเคยกดถูกใจไปแล้วกี่รายการ
  // เชื่อมต่อไปยัง: Context API ภายใต้ฉากหลัง หากมีแก้ไขจากหน้าอื่น ตัวแปร favorites นี้จะรับรู้และอัปเดตหน้า Navbar ทันที
  const { favorites } = useFavorites();

  return (
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* 
        Link ตัวแรกลิงก์ไปที่ "/" ทำหน้าที่เสมือนเป็นโลโก้ของเว็บไซต์ เมื่อคลิกจะพาผู้ใช้เหวี่ยงกลับไปที่ HomePage เสมอ 
      */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {/* ลิงก์พาผู้ใช้ไปยังหน้า HomePage */}
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          หน้าหลัก
        </Link>
        {/* ลิงก์พาผู้ใช้ไปยังหน้า ProfilePage */}
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          สมาชิก
        </Link>
        {/* ลิงก์พาผู้ใช้ไปยังหน้า SearchPage */}
        <Link to="/search" style={{ color: "white", textDecoration: "none" }}>
          ค้นหา
        </Link>
        {/* ลิงก์พาผู้ใช้ไปยังหน้า FavoritesPage */}
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
            // favorites.length: วัดขนาดของอาร์เรย์ หากมีค่า > 0 แสดงว่ามีถูกใจ เปลี่ยนสีบล็อกให้เด่นขึ้นด้วยแดง (#e53e3e)
            // ถ้าไม่มียังคงปล่อยโปร่งใส (transparent) ดังเดิม
            background: favorites.length > 0 ? "#e53e3e" : "transparent",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          {/* แสดงจำนวนโพสต์ที่ชื่นชอบ ถ้ามีจำนวน > 0 ขึ้นไปก็จะแสดงตัวเลขในวงเล็บ */}
          ❤️ ถูกใจ {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
