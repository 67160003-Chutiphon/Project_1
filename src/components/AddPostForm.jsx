import { useState } from "react";

// รับ props onAddPost เพื่อส่งข้อมูลโพสต์ใหม่กลับไปให้ไฟล์แม่ (App.jsx)
function AddPostForm({ onAddPost }) {
  // สร้าง state มารองรับค่าที่กรอกในช่องหัวข้อ และช่องเนื้อหา
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // ฟังก์ชันนี้ถูกเรียกเมื่อกดปุ่ม "โพสต์" หรือกด Enter ในฟอร์ม
  function handleSubmit(e) {
    e.preventDefault(); // ป้องกันไม่ให้เบราว์เซอร์รีเฟรชหน้าเว็บเวลา submit ฟอร์ม
    
    // ตรวจสอบว่าถ้าช่องว่างทั้งคู่ (ไม่มีตัวอักษร) ก็ให้ return ยกเลิกการแอดโพสต์
    if (!title.trim() || !body.trim()) return;

    // เรียกฟังก์ชันจาก props พร้อมส่ง object ที่มี title และ body กลับไป
    onAddPost({ title, body });
    
    // รีเซ็ตค่าในฟอร์มให้กลับมาว่างเปล่า หลังจากโพสต์เสร็จ
    setTitle("");
    setBody("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />

      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

export default AddPostForm;
