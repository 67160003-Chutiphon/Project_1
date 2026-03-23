import { createContext, useContext, useState, useEffect } from "react";

// FavoritesContext: ออบเจ็กต์ Context ที่สร้างขึ้นเพื่อเป็นพื้นที่ศูนย์กลางในการแชร์ข้อมูล (สถานะรายการโปรด) 
// โดยไม่ต้องส่ง props ต่อๆ กันลงไปในแต่ละ component (Prop drilling)
// เชื่อมต่อไปยัง: FavoritesProvider (เพื่อส่งข้อมูล) และ useFavorites (เพื่อดึงข้อมูลไปใช้)
const FavoritesContext = createContext();

// FavoritesProvider: คอมโพเนนต์ทำหน้าที่เป็นตัวส่งข้อมูล (Provider) โดยจะนำไปครอบแอปพลิเคชันหรือส่วนที่ต้องการใช้ข้อมูลนี้
// เชื่อมต่อไปยัง: App.jsx (ถูกเรียกใช้เพื่อครอบ <BrowserRouter> ทั้งหมด)
// ตัวแปร children: หมายถึงคอมโพเนนต์ลูกทั้งหมดที่อยู่ภายใต้ <FavoritesProvider> ... </FavoritesProvider>
export function FavoritesProvider({ children }) {

  // favorites: State ตัวแปรแบบ Array ทำหน้าที่เก็บรายการ ID ของโพสต์ที่ผู้ใช้กดถูกใจ (ชื่นชอบ)
  // setFavorites: ฟังก์ชันสำหรับอัปเดตค่าตัวแปร favorites
  // สถานะเริ่มต้น: จะใช้ฟังก์ชันแบบ Lazy initialization ดึงข้อมูลจาก localStorage มาตั้งเป็นค่าเริ่มต้น
  const [favorites, setFavorites] = useState(() => {
    try {
      // savedFavorites: ตัวแปรเก็บข้อความ JSON จาก localStorage ที่มี key ชื่อว่า 'favorites'
      // เชื่อมต่อไปยัง: หน่วยความจำเบราว์เซอร์ เพื่อให้ข้อมูลไม่หายไปเมื่อรีเฟรชหน้าเว็บ
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  // useEffect (Side effect): ทำหน้าที่จับตาดูตัวแปร favorites ถ้ามีการเปลี่ยนแปลงเมื่อไหร่ จะทำงานในบล็อกนี้
  // การทำงาน: นำ array favorites ไปแปลงเป็น JSON string แล้วบันทึกทับลงใน localStorage 
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // toggleFavorite: ฟังก์ชันสำหรับสลับสถานะ (เพิ่ม/ลบ) รายการโปรด
  // ตัวแปร postId: รับค่า ID รหัสของโพสต์เป้าหมาย
  // เชื่อมต่อไปยัง: Component ต่างๆ เช่น PostCard ที่มีปุ่มกดถูกใจ (Heart button) เมื่อกดจะเรียกฟังก์ชันนี้
  function toggleFavorite(postId) {
    setFavorites((prev) =>
      // ตัวแปร prev: หมายถึงค่า array เดิมของ favorites ก่อนหน้าที่จะอัปเดต
      // ถ้า prev มี postId อยู่แล้ว ให้เอาออก (filter)
      // ถ้ายังไม่มี ให้เพิ่มเข้าไปต่อท้าย (spread operator)
      prev.includes(postId)
        ? prev.filter((id) => id !== postId) 
        : [...prev, postId] 
    );
  }

  return (
    // <FavoritesContext.Provider>: นำ Context ที่สร้างไว้ มาแนบค่า (value) เพื่อกระจายต่อให้ children
    // ตัวแปร value: สิ่งที่ต้องการส่งต่อ ได้แก่ array favorites และฟังก์ชัน toggleFavorite
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// useFavorites: ฟังก์ชัน Custom Hook ที่สร้างคลุม useContext(FavoritesContext) ไว้
// เพื่อเพิ่มความสะดวกในการดึงข้อมูลจาก Context ไปใช้ โดยที่ปลายทางไม่ต้อง import ทั้ง useContext และ FavoritesContext
// เชื่อมต่อไปยัง: Component ปลายทาง เช่น PostCard, FavoritesPage ที่ต้องการดึงข้อมูล favorites มาอ่าน หรืออัปเดต 
export function useFavorites() {
  return useContext(FavoritesContext);
}
