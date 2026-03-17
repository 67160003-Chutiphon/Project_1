import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AddPostForm from "./components/AddPostForm";

const FAVORITES_STORAGE_KEY = "devboard_favorites";

// ดึงรายการ favorites จาก Local Storage
function getSavedFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsed = JSON.parse(raw || "null");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// หน้าเว็บหลัก แสดง UI และจัดการ state การชอบโพสต์ (favorites)
function App() {
  const [favorites, setFavorites] = useState(() => getSavedFavorites());

  // บันทึก favorites ลง Local Storage ทุกครั้งที่มีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // ซ่อน/แสดง รายการที่ชอบ
  function handleToggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        <div>
          {/* Form รอการเชื่อมต่อจริงในสัปดาห์ถัดไป ตอนนี้ใส่ onAddPost ว่าง ๆ ไปก่อน */}
          <AddPostForm onAddPost={() => {}} />
          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        <div>
           {/* แสดง UserList ด้านขวาแทน Hardcode เดิม */}
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
