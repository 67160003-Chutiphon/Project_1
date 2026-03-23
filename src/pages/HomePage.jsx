import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

// HomePage: คอมโพเนนต์สวมรอยเป็นหน้าหลักสุด (Landing Page) เมื่อเข้ามาที่ URL "/" (Root Route)
// เชื่อมต่อไปยัง: App.jsx ผ่านระบบ Routing 
function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* 
        AddPostForm: เรียกใช้คอมโพเนนต์สำหรับฟอร์มกรอกข้อความเพื่อสร้างโพสต์ใหม่ 
        ณ ที่นี้ โพรพเพอร์ตี้ onAddPost ถูกส่งค่าเป็นฟังก์ชันว่าง ()=>{} ไปก่อน 
        เนื่องจากยังไม่ได้เดินสายไฟลงฐานข้อมูลของระบบหลังบ้าน(Backend) จริงๆ 
      */}
      <AddPostForm onAddPost={() => {}} />
      
      {/* 
        PostList: เรียกใช้คอมโพเนนต์แสดงรายการโพสต์ (ซึ่ง PostList จะไปจัดการเรื่องเชื่อมต่อ API ดึงของมาโชว์เอง) 
      */}
      <PostList />
    </div>
  );
}

export default HomePage;
