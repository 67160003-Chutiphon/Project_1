import UserList from "../components/UserList";

// ProfilePage: คอมโพเนนต์ทำหน้าเป็นหน้าต่างรายชื่อสมาชิกทั้งหมดของทางแพลตฟอร์มบอร์ด
// เชื่อมต่อไปยัง: App.jsx (Route /profile) ทำหน้าที่เป็นทางผ่านง่ายๆ ก่อนจะเรียกคอมโพเนนต์ยิบย่อยอื่นๆ ต่อ
function ProfilePage() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* 
        UserList: คอมโพเนนต์ที่ทำหน้าที่รับเหมาส่วนการดึง API บัญชีผู้ใช้ไปแสดงผลรวมๆ เป็นการแยกความรับผิดชอบ
      */}
      <UserList />
    </div>
  );
}

export default ProfilePage;
