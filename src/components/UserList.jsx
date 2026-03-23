import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch"; // ดึง custom hook มาใช้งาน

// UserList: คอมโพเนนต์ดึงข้อมูลเพื่อโชว์อาเรย์รายชื่อบัญชีผู้ใช้
// เชื่อมต่อไปยัง: ใช้โชว์เต็มบน ProfilePage (หน้าสมาชิก) 
function UserList() {
  
  // users: ตัวแปรผลลัพธ์ (สวมรอย data) จาก API 
  // loading / error: ตัวแปรสถานะจาก useFetch hook ทั่วไป
  const { data: users, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <LoadingSpinner />;
  
  if (error) return (
    <div style={{ color: "#c53030", padding: "1rem" }}>เกิดข้อผิดพลาด: {error}</div>
  );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>
      {/* วนลูปข้อมูลใน users แล้วสร้าง UserCard ออกมาทีละใบ โดยยัดข้อมูลเข้าไปใน Props ให้การ์ดจัดการต่อ */}
      {users && users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;