import React from "react";
import ReactDOM from "react-dom/client"; // ใช้ ReactDOM เพื่อนำ Component ไปผูกกับ HTML
import App from "./App.jsx"; // นำเข้า Component หลักของแอปพลิเคชัน
import "./index.css"; // นำเข้าสไตล์พื้นฐาน (CSS)

// คำสั่งนี้เป็นจุดเริ่มต้นของโปรเจกต์ React
// จะดึงแท็ก id="root" จากใน index.html มาเป็นที่อยู่ (Container) สำหรับเรนเดอร์ React App ทั้งหมด
ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode ช่วยเตือนหากมีการตั้งค่าที่ผิดปกติระหว่างที่เขียนโค้ด (มีผลเฉพาะตอน dev)
  <React.StrictMode>
    {/* เรนเดอร์ Component App ซึ่งเก็บ Route และการจัดวางทั้งหมดเอาไว้ */}
    <App />
  </React.StrictMode>
);
