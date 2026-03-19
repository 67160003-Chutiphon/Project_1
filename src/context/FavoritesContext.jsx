import { createContext, useContext, useState, useEffect } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

// 2. Provider component — ครอบ App ทั้งหมด
export function FavoritesProvider({ children }) {
  // อ่านค่าเริ่มต้นจาก localStorage (Challenge 3: Favorites คงอยู่ใน Context + localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  // sync ข้อมูลลง localStorage ทุกครั้งที่ state favorites มีการเปลี่ยนแปลง (Challenge 3)
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId) // ถ้ามีอยู่แล้วให้เอาออก
        : [...prev, postId] // ถ้ายังไม่มีให้เพิ่มเข้าไป
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook สำหรับเรียกใช้ Context โดยไม่ต้อง import useContext และ ตัว Context บ่อยๆ
export function useFavorites() {
  return useContext(FavoritesContext);
}
