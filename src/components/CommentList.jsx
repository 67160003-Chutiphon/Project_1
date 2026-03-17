import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

// รายการความคิดเห็นที่จะถูก fetch ก็ต่อเมื่อถูกเรียกใช้ (on-demand)
function CommentList({ postId }) {
  const [comments, setComments] = useState([]); // เก็บรายการคอมเมนต์
  const [loading, setLoading] = useState(true); // สถานะรอข้อมูล
  const [error, setError] = useState(null); // สถานะ error

  useEffect(() => {
    // ฟังก์ชัน async อยู่ภายใน useEffect เพื่อไม่ให้ callback เป็น async โดยตรง
    async function fetchComments() {
      try {
        setLoading(true);
        // ดึง comments ของแต่ละ postId
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId]); // ค่า postId เปลี่ยนเมื่อไหร่ ก็จะ fetch ใหม่

  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>
      {comments.map((comment) => (
        <div
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
            {comment.name}
          </div>
          <div style={{ color: "#718096" }}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
