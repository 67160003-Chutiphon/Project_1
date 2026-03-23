import { useState } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "../hooks/useFetch";

// PostList: คอมโพเนนต์เป็นกล่องแสดงรายการของโพสต์ทั้งหมด มีระบบค้นหา(Search) ระบบดึงใหม่(Refetch) และเปลี่ยนหน้า(Pagination)
// เชื่อมต่อไปยัง: HomePage.jsx สวมส่วนนี้ลงในหน้าแรก
function PostList() {
  
  // destructuring ค่าที่ได้จาก useFetch() ที่ดึงข้อมูลจาก API endpoint ของ posts
  // posts: เก็บอาเรย์ข้อมูล (เปลี่ยนชื่อเล่นจำลองจากคำว่า data เป็น posts เพื่อง่ายต่อความเข้าใจ)
  // loading: สถานะการโหลด (Boolean)
  // error: ข้อความผิดพลาด
  // refetch: ฟังก์ชันสำหรับถูกเรียกเพื่อไปดึงข้อมูลใหม่
  const { data: posts, loading, error, refetch } = useFetch("https://jsonplaceholder.typicode.com/posts");
  
  // search: State ตัวแปรข้อความ (String) เก็บคีย์เวิร์ดที่ผู้ใช้พิมพ์หา
  // setSearch: ตัวแปรฟังก์ชันอัปเดตช่องค้นหา (ผูกไว้กับ input)
  const [search, setSearch] = useState("");
  
  // currentPage: State ตัวแปร (Number) ทำหน้าที่ชี้บอกเบราว์เซอร์ว่าเรากำลังอยู่เนื้อหาหน้าที่เท่าไหร่
  // setCurrentPage: ตัวแปรฟังก์ชันใช้อัปเดตตัวเลขหน้า 
  const [currentPage, setCurrentPage] = useState(1); 

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  // filtered: ตัวแปร Array สำรอง ทำการกลั่นกรอง (Filter) โพสต์ที่มีจาก posts ทั้งหมด 
  // อาศัยเงื่อนไขคัดเฉพาะโพสต์ที่เนื้อไตเติ้ลมีคำที่ซ้อนตรงกันกับคำหลัก (search keyword) 
  const filtered = posts ? posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  ) : [];

  // itemsPerPage: ตัวแปรคงที่ (Constant Value) ควบคุมว่าจะโชว์หน้าละกี่ใบ (จำกัดที่ 10 ลิสต์ต่อหน้า)
  const itemsPerPage = 10;
  
  // totalPages: ตัวแปรจำนวนเต็ม ทำหน้าที่คำนวณว่าต้องมีทั้งหมดกี่หน้า โดยเอาจำนวนโพสต์หลักๆที่คัดแล้ว (filtered) มาหาร 10 และปัดเศษขึ้น
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  // currentPosts: ตัวแปร Array ใช้ตัดเฉพาะส่วนจาก filtered (Slice array) เพื่อแยกว่า 10 ตัวไหนควรตกอยู่ที่หน้าัจจุบัน (currentPage)
  const currentPosts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
        <h2 style={{ color: "#2d3748", margin: 0 }}>
          โพสต์ล่าสุด {posts && `(${posts.length})`}
        </h2>
        <button 
          onClick={() => {
            setCurrentPage(1); // รีเซ็ตตัวแปรหน้าให้กลับไปที่ 1 ก่อนดึงใหม่
            refetch(); // เรียกฟังก์ชัน refetch ให้เคลียร์ API โหลดข้อมูลใหม่ทั้งหมด
          }}
          style={{
            padding: "0.4rem 0.8rem",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            background: "white",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#4a5568"
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search} // ผูกค่ากล่อง input เข้ากับ state search
        onChange={(e) => {
          setSearch(e.target.value); // อัปเดต state ตัวอักษร
          setCurrentPage(1); // เมื่อคำค้นหาใหม่ ให้เด้งกลับไปบรรทัดหน้า 1 ต่อให้จะอยู่หน้า 3 อยู่ก็เถอะ
        }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* วนลูป currentPosts (ไม่ใช่ filtered) เพราะจะเรนเดอร์แค่ 10 อันต่อหน้า นำไปยัดใส่ PostCard */}
      {currentPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* โซนสร้างปุ่ม Pagination จะเรนเดอร์ก็ต่อเมื่อหน้าทั้งหมดมากกว่า 0 */}
      {totalPages > 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
          
          <button 
            disabled={currentPage === 1} // ถ้าอยู่หน้าแรก ปิดการกด (Disable) 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} // ลดเลขหน้า 1 ค่า
            style={{ padding: "0.5rem 1rem", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1, borderRadius: "6px", border: "1px solid #cbd5e0", background: "white", color: "#4a5568" }}
          >
            ← ก่อนหน้า
          </button>
          
          <span style={{ color: "#4a5568", fontWeight: "bold" }}>หน้า {currentPage} / {totalPages}</span>
          
          <button 
            disabled={currentPage === totalPages} // ป้องกันไม่ให้กดเกินหน้าสุดท้าย
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} // บวกเลขหน้าเพิ่ม 1 ค่า 
            style={{ padding: "0.5rem 1rem", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1, borderRadius: "6px", border: "1px solid #cbd5e0", background: "white", color: "#4a5568" }}
          >
            ถัดไป →
          </button>

        </div>
      )}
    </div>
  );
}

export default PostList;
