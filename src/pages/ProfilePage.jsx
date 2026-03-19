import UserList from "../components/UserList";

function ProfilePage() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* องค์ประกอบเพื่อแสดงรายชื่อผู้ใช้ที่ดึงจาก API */}
      <UserList />
    </div>
  );
}

export default ProfilePage;
