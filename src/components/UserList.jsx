import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch"; // ดึง custom hook มาใช้งาน

// หน้านี้ดึงข้อมูลบัญชีผู้ใช้
function UserList() {
  // ดึงข้อมูล users ด้วย useFetch ช่วยลด code ซ้ำซ้อน
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
      {users && users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
