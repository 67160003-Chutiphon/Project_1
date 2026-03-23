// UserCard: คอมโพเนนต์ทำหน้าเป็นการ์ดบรรจุข้อมูลผู้ใช้แต่ละราย 
// เชื่อมต่อไปยัง: ใช้ในหน้า UserList หรือ ProfilePage ที่มีลิสต์ผู้ใช้หลายคน
// ตัวแปร Props name (ชื่อ) และ email (อีเมล์) ของผู้ใช้
function UserCard({ name, email }) {
  // initials: ตัวแปรเก็บอักษรย่อ ทำหน้าที่แสดงไอคอน Profile Avatar (ตัวอักษร)
  // หลักการคือเอา string 'name' มาหั่น (split) ด้วยช่องว่าง และหยิบเฉพาะตัวอักษรหน้าสุดของทุกซีกมารวมติดกัน (join)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: "#1e40af",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        {/* นำอักษรย่อ initials ไปเรนเดอร์แปะไว้กลางวงกลมสีน้ำเงิน */}
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
