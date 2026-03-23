import React from "react";
// ReactDOM: ไลบรารีสำหรับนำ React UI (Virtual DOM) ไปวาดหรือแสดงผลบนเบราว์เซอร์จริง (Real DOM)
import ReactDOM from "react-dom/client"; 
// App: นำเข้า Component หลักของแอปพลิเคชัน ซึ่งทำหน้าที่เป็นศูนย์กลางรวบรวมหน้าและเส้นทางทั้งหมด
import App from "./App.jsx"; 
// index.css: นำเข้าไฟล์สไตล์พื้นฐาน (CSS) ที่จะถูกใช้งานแบบ Global ทั่วทั้งโปรเจกต์
import "./index.css"; 

// rootElement: ตัวแปรอ้างอิงถึงตำแหน่ง DOM ในไฟล์ index.html ที่มี id="root" ซึ่งเป็นจุดเริ่มต้นที่จะนำ React ไปแสดงผล
const rootElement = document.getElementById("root");

// root: สร้างตัวจัดการระดับราก (Root) ของ React เพื่อเจาะจงว่าแอปพลิเคชันจะถูกโหลดและจัดการที่ rootElement
const root = ReactDOM.createRoot(rootElement);

// เรนเดอร์ (Render) โค้ดลงใน root
root.render(
  // React.StrictMode: Component พิเศษของ React ที่ชวยตรวจสอบข้อผิดพลาด เตือนเรื่องการใช้งาน API ที่ล้าสมัย
  // และกระตุ้นเตือนเรื่อง side effects ซ้ำซ้อน (ทำงานเฉพาะในโหมด Development เท่านั้น)
  <React.StrictMode>
    {/* เรนเดอร์ Component App ซึ่งเก็บ Router และโครงสร้าง Provider ของหน้าทั้งหมดเอาไว้ */}
    <App />
  </React.StrictMode>
);
