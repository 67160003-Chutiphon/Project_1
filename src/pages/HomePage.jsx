import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* ฟอร์มสำหรับเพิ่มโพสต์ใหม่ (ฟังก์ชัน onAddPost ว่างไว้ก่อนตามโจทย์) */}
      <AddPostForm onAddPost={() => {}} />
      {/* องค์ประกอบแสดงรายการโพสต์ทั้งหมด */}
      <PostList />
    </div>
  );
}

export default HomePage;
