import { useState, useEffect } from "react";
// นำเข้า LoadingSpinner อาศัยไว้โชว์ขณะที่กำลังรอโหลดข้อมูลคอมเมนต์
import LoadingSpinner from "./LoadingSpinner";

// CommentList: คอมโพเนนต์สำหรับแสดงรายการความคิดเห็นใต้โพสต์
// เชื่อมต่อไปยัง: PostCard.jsx (เพื่อแสดงคอมเมนต์เวลาผู้ใช้กดปุ่มดูความเห็น) และ PostDetailPage.jsx
// ตัวแปร postId (Props): รับรหัส ID ของโพสต์เป้าหมาย เพื่อนำไปใช้ดึงข้อมูลคอมเมนต์เฉพาะของโพสต์นั้นๆ จาก API
function CommentList({ postId }) {
  
  // comments: State ตัวแปรประเภท Array ทำหน้าที่เก็บรายการออบเจ็กต์ "ความคิดเห็น" ที่ดึงมาจาก API
  // setComments: ฟังก์ชันสำหรับอัปเดตข้อมูลตัวแปร comments
  const [comments, setComments] = useState([]); 

  // loading: State ตัวแปรประเภท Boolean บอกสถานะว่ากำลังทำการดึงข้อมูลผ่านอินเทอร์เน็ตอยู่หรือไม่ (true=กำลังโหลด)
  // setLoading: ฟังก์ชันอัปเดตสถานะ loading
  const [loading, setLoading] = useState(true); 

  // error: State ตัวแปรทำหน้าที่เก็บรวบรวมข้อผิดพลาด (เช่น เน็ตหลุด, API ล่ม) หากการเชื่อมต่อมีปัญหา
  // setError: ฟังก์ชันตั้งค่าข้อผิดพลาด
  const [error, setError] = useState(null); 

  // useEffect (Side effect): ดำเนินการดึงข้อมูลคอมเมนต์ทันทีที่คอมโพเนนต์นี้ถูกแสดงขึ้นมา (Mount) หรือเมื่อ postId เปลี่ยน 
  useEffect(() => {
    
    // fetchComments: ฟังก์ชันการทำงานแบบ Asynchronous ทำหน้าที่ติดต่อกับ API ย่อย
    async function fetchComments() {
      try {
        setLoading(true); // เริ่มสถานะกำลังโหลด
        
        // res: ตัวแปรเก็บ Response Object ซึ่งเป็นผลลัพธ์จากการตอบกลับของ Server
        // ใช้ fetch ร่วมกับ postId ส่งคำขอไปยัง API ปลายทาง
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ"); // ถ้าสถานะ HTTP ไม่ใช่ 200-299 ให้สร้าง Exception
        
        // data: ตัวแปรเก็บผลลัพธ์ข้อมูลที่แปลงโครงสร้าง JSON Response กลับมาเป็น JavaScript Array of Objects
        const data = await res.json();
        
        // ส่ง Array ความคิดเห็นที่ได้เข้าไปเก็บใน State ของตัวแปร comments
        setComments(data);
      } catch (err) {
        // err: ตัวแปรที่จับ Error หาก try ทำงานไม่สำเร็จ เพื่อส่งต่อไปให้แสดงผลทางหน้าจอ
        setError(err.message);
      } finally {
        // ปิดสถานะกำลังโหลดเมื่อกระบวนการจบสิ้นลง
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId]); // [postId] คือ Dependency Array บอกว่าให้ทำงานทุกครั้งถ้ารหัสโพสต์เปลี่ยนแปลง

  // เช็คเงื่อนไขก่อนเรนเดอร์: หากตัวแปร loading มีค่าเป็น true จะแสดงประโยค "กำลังโหลด..."
  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;

  // เช็คเงื่อนไขก่อนเรนเดอร์: หากตัวแปร error มีค่าเป็นข้อความ (ไม่เท่ากับ null) จะแสดงประโยคข้อความข้อผิดพลาดนั้น 
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  // เรนเดอร์ส่วนเนื้อหาหลัก เมื่อโหลดข้อมูลคอมเมนต์สำเร็จแล้ว
  return (
    <div style={{ marginTop: "0.75rem" }}>
      <strong style={{ color: "#4a5568" }}>
        {/* comments.length: แสดงจำนวนความคิดเห็นที่มีทั้งหมด */}
        ความคิดเห็น ({comments.length})
      </strong>
      
      {/* วนลูปตัวแปรอาร์เรย์ comments นำแต่ละออบเจ็กต์ไปเรนเดอร์ลงใน UI */}
      {comments.map((comment) => (
        <div
          // comment.id: คีย์เฉพาะตัวที่ React จำเป็นต้องใช้เวลามีการวนลูปเรนเดอร์ UI ซ้ำๆ
          key={comment.id}
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {/* comment.name: แสดงชื่อของผู้ที่เขียนคอมเมนต์ */}
            {comment.name}
          </div>
          <div style={{ color: "#718096" }}>
            {/* comment.body: แสดงเนื้อหาข้อความที่เป็นข้อคิดเห็น */}
            {comment.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
