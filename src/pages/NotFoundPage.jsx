import { Link } from "react-router-dom";

// NotFoundPage: คอมโพเนนต์ทำหน้าที่เป็นหน้า 404 แจ้งเตือนเมื่อผู้ใช้เข้าถึงผิดหน้า (Route ไม่ตรงตามที่ระบุในเส้นทาง App.jsx) 
// ทางเทคนิคเรียกว่า Catch-all Route 
// เชื่อมต่อไปยัง: App.jsx ตรง `path="*"`
function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
      }}
    >
      {/* แสดงหัวข้อ 404 บ่งบอกสถานะหาไฟล์ไม่พบ (Not Found) ด้วยตัวหนังสือขนาดใหญ่ */}
      <h1 style={{ fontSize: "5rem", color: "#e53e3e", margin: "0" }}>404</h1>
      
      {/* ข้อความอธิบายสถานะให้ผู้ใช้งานเห็นด้วยภาษาที่เข้าใจง่าย */}
      <h2 style={{ color: "#2d3748", marginBottom: "2rem" }}>
        ไม่พบหน้าที่คุณต้องการ
      </h2>
      
      {/* 
        Link: คอมโพเนนต์แทนแท็ก anchor ทำตัวเป็นปุ่มลิงก์พาผู้ใช้กระโดดกลับไปสู่หน้า Root ("/") เพื่อเริ่มต้นใหม่
      */}
      <Link
        to="/"
        style={{
          background: "#1e40af",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
