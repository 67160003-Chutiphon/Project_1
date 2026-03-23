// BrowserRouter, Routes, Route: นำเข้าส่วนควบคุมเส้นทางจาก react-router-dom ใช้สำหรับทำ Client-side routing ในแอพแบบหน้าเดียว (SPA)
import { BrowserRouter, Routes, Route } from "react-router-dom";
// FavoritesProvider: นำเข้า Provider Component ทำหน้าที่แชร์สถานะ (State) ของรายการโปรด (Favorites) 
// ไปยังลูกๆ (Child Components) ทุกตัวที่อยู่ภายใต้มัน ผ่านระบบ Context API
import { FavoritesProvider } from "./context/FavoritesContext";

// นำเข้า Component Navbar ซึ่งเป็นส่วนแถบนำทางที่แสดงในทุกหน้า เพื่อให้ผู้ใช้กดเปลี่ยนหน้าได้
import Navbar from "./components/Navbar";

// นำเข้า Page Components ต่างๆ ที่จะทำหน้าที่เป็นหน้าแต่ละหน้าเมื่อ URL เปลี่ยน
import HomePage from "./pages/HomePage";             // หน้าแรก (เส้นทาง "/")
import PostDetailPage from "./pages/PostDetailPage"; // หน้ารายละเอียดโพสต์ (เส้นทาง "/posts/:id")
import ProfilePage from "./pages/ProfilePage";       // หน้าโปรไฟล์ (เส้นทาง "/profile")
import FavoritesPage from "./pages/FavoritesPage";   // หน้ารายการโปรด (เส้นทาง "/favorites")
import SearchPage from "./pages/SearchPage";         // หน้าค้นหา (เส้นทาง "/search")
import NotFoundPage from "./pages/NotFoundPage";     // หน้าเกิดข้อผิดพลาด 404 เมื่อไม่พบเส้นทาง (เส้นทาง "*")

// App: ฟังก์ชันคอมโพเนนต์หลัก (Root Component)
// หน้าที่: เป็นตัวแม่ที่รวบรวมทุกๆ หน้าและการตั้งค่าของโปรเจ็กต์เข้าด้วยกัน
// การเรียกใช้: ถูกเรียกใช้และเรนเดอร์ใน main.jsx
function App() {
  return (
    // <FavoritesProvider>: ครอบแอปพลิเคชันทั้งหมดเพื่อให้ Context สามารถใช้งานได้ในทุก Component ที่อยู่ด้านใน
    <FavoritesProvider>
      {/* <BrowserRouter>: ตัวควบคุมระบบจัดการเส้นทาง (Routing) หลักของแอป */}
      <BrowserRouter>
        {/* <Navbar />: ใส่ไว้ภายนอก <Routes> เพื่อให้อยู่คงที่ทุกหน้า ไม่ว่าทาง URL จะเปลี่ยนเป็นอะไร Navbar จะยังอยู่ */}
        <Navbar />
        {/* <Routes>: ตู้คอนเทนเนอร์ดูแลการจับคู่ URL pattern (เส้นทาง) ไปยัง Component (หน้า) ทีกำหนด */}
        <Routes>
          {/* <Route>: ทำหน้าที่ระบุกฎว่า URL ไหน (path) ให้แสดงคอมโพเนนต์อะไร (element) */}
          <Route path="/" element={<HomePage />} />
          
          {/* :id เป็นตัวแปรพารามิเตอร์แบบพลวัต (URL Parameter) ที่จะถูกส่งหรือเชื่อมต่อไปยัง PostDetailPage เพื่อดึงข้อมูลเฉพาะเจาะจง */}
          <Route path="/posts/:id" element={<PostDetailPage />} />
          
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* path="*" คือ Catch-all route คอยจับ URL ทุกอันที่ไม่มีการกำหนดตัวจับคู่เอาไว้ เพื่อแสดงหน้าความผิดพลาดให้กับผู้ใช้ */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

// ส่งออก AppComponent (Default Export) เพื่อให้ main.jsx สามารถ import ไปใช้งานได้
export default App;
