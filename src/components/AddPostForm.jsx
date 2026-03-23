import { useState } from "react";

// AddPostForm: คอมโพเนนต์สำหรับแสดงแบบฟอร์มเพิ่มโพสต์ใหม่
// เชื่อมต่อไปยัง: นำไปใช้แสดงผลใน HomePage.jsx
// ตัวแปร onAddPost (Props): เป็นฟังก์ชันที่รับมาจากแม่ (HomePage) เพื่อส่งข้อมูลโพสต์ที่กรอกเสร็จแล้วกลับไปให้แม่จัดการต่อ
function AddPostForm({ onAddPost }) {
  
  // title: State ตัวแปรประเภท String ทำหน้าที่เก็บข้อความหน้าฟอร์มในช่อง "หัวข้อโพสต์"
  // setTitle: ฟังก์ชันสำหรับอัปเดตค่า title ทุกครั้งที่ผู้ใช้อินพุตตัวอักษร
  const [title, setTitle] = useState("");

  // body: State ตัวแปรประเภท String ทำหน้าที่เก็บข้อความหน้าฟอร์มในช่อง "เนื้อหาโพสต์" (Textarea)
  // setBody: ฟังก์ชันสำหรับอัปเดตค่า body ทุกครั้งที่ผู้ใช้อินพุตตัวอักษร
  const [body, setBody] = useState("");

  // handleSubmit: ฟังก์ชันสำหรับจัดการเหตุการณ์เมื่อผู้ใช้กดปุ่ม "โพสต์" ในฟอร์ม หรือกด Enter
  // เชื่อมต่อไปยัง: แอตทริบิวต์ onSubmit ของแท็ก <form> ด้านล่าง
  // ตัวแปร e (Event Object): ออบเจ็กต์ข้อมูลเหตุการณ์ที่เกิดขึ้นจากการ submit
  function handleSubmit(e) {
    // e.preventDefault(): สั่งยกเลิกพฤติกรรมดั้งเดิมของเบราว์เซอร์ที่จะรีเฟรชหน้าต่างใหม่เมื่อกด submit รูปแบบฟอร์ม
    e.preventDefault(); 
    
    // ตรวจสอบข้อมูลก่อน: ถ้านำ title หรือ body ไปตัดช่องว่าง (trim) แล้วพบว่าว่างเปล่าทั้งคู่ จะให้ยกเลิกการทำงานทันที (return)
    if (!title.trim() || !body.trim()) return;

    // เรียกฟังก์ชันแม่ onAddPost ที่ถูกส่งมาทาง props พร้อมส่งโครงสร้างออบเจ็กต์ที่มี title และ body กลับไปให้ HomePage
    onAddPost({ title, body });
    
    // เมื่อส่งข้อมูลเสร็จแล้ว ทำการเคลียร์ช่องกรอกข้อมูลให้กลับมาเป็นค่าว่าง เพื่อความพร้อมใช้งานในรอบถัดไป
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
        value={title} // ผูกค่าในช่องอินพุตกับตัวแปร state title
        onChange={(e) => setTitle(e.target.value)} // อัปเดต state เมื่อพิมพ์
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
        value={body} // ผูกค่าในช่อง textarea กับตัวแปร state body
        onChange={(e) => setBody(e.target.value)} // อัปเดต state เมื่อพิมพ์
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
