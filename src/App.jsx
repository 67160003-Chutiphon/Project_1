import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage"; // เพิ่มหน้าค้นหาข้อมูล
import NotFoundPage from "./pages/NotFoundPage"; // เพิ่มหน้ากรณีไม่พบ URL ในระบบ

function App() {
  return (
    // ครอบ Components ทั้งหมดด้วย Providers เพื่อให้แชร์ State แบบเจาะลึกได้ (ข้อมูล favorites)
    <FavoritesProvider>
      {/* BrowserRouter จำเป็นสำหรับการใช้งาน react-router-dom */}
      <BrowserRouter>
        {/* Navbar แถบเมนู ให้ไปแสดงในทุกๆ หน้าที่เรียกผ่าน routes ย่อย */}
        <Navbar />
        {/* Routes จัดการเรื่องเส้นทาง URL ว่า path ไหนไป component ไหน */}
        <Routes>
          {/* หน้าหลัก */}
          <Route path="/" element={<HomePage />} />
          {/* หน้ารายละเอียดโพสต์ แต่ละโพสต์จะมี ID ไม่เหมือนกัน */}
          <Route path="/posts/:id" element={<PostDetailPage />} />
          {/* หน้าโปรไฟล์สมาชิก */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* หน้ารวมความชื่นชอบ */}
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* หน้าการค้นหา */}
          <Route path="/search" element={<SearchPage />} />
          {/* ระบุเส้นทาง * คือ url ใดๆ ที่ไม่ได้กำหนดไว้ก่อนหน้า จะเข้ามาหน้า NotFoundPage (404) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
