import { Link } from "react-router-dom";

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
      {/* แสดงหน้า 404 กรณีที่เข้า URL ผิดเส้นทาง */}
      <h1 style={{ fontSize: "5rem", color: "#e53e3e", margin: "0" }}>404</h1>
      <h2 style={{ color: "#2d3748", marginBottom: "2rem" }}>
        ไม่พบหน้าที่คุณต้องการ
      </h2>
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
