import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PostCard from "../components/PostCard";
import useFetch from "../hooks/useFetch";

// SearchPage: คอมโพเนนต์ที่ให้บริการด้านการค้นหาข้อความ และแสดงผลลัพธ์ผ่าน URL Query String
// เชื่อมต่อไปยัง: เผยแพร่ใน App.jsx ภายใต้ Route /search 
function SearchPage() {
  // searchParams, setSearchParams: คู่หูทำงานจาก react-router ดึงและอัปเดต Query ใน URL (?q=word)
  // เพื่อให้ผลลัพธ์ถูกแชร์หรือบุ๊กมาร์กผ่าน URL นั้นได้จริงๆ อย่างอิสระ
  const [searchParams, setSearchParams] = useSearchParams();
  
  // query: ตัวแปร String ค้นหาดึงค่า "q" ออกจากหน้า URL ปัจจุบัน
  // นำไป trim เพื่อตัดช่องว่างหัวท้ายทิ้ง หากค่าเป็น null ให้ตีเป็น string ว่างๆ ไป ("")
  const query = (searchParams.get("q") || "").trim();
  
  // searchInput: State ตัวแปร String เก็บข้อความที่ผู้ใช้พิมพ์ในช่อง input กรอกคำค้น 
  // setSearchInput: ฟังก์ชันอัปเดตค่าเมื่อคีย์บอร์ดพิมพ์ลงไป 
  const [searchInput, setSearchInput] = useState(query);
  
  // ดึงโพสต์ทั้งหมดมารอไว้ด้วย useFetch (เสมือนฐานข้อมูลในตัวอย่างนี้)
  // data, loading, error: ชุดข้อมูล/สถานะที่ Hook ปล่อยออกมา
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");
  
  // posts: ตัวแปรอาเรย์ใช้สำรอง (Fallback) โดยหาก data ยังเป็น null ก็ให้เป็น Array ว่าง ([]) ลดการ Error เวลาเรียก .filter()
  const posts = data || [];

  // useEffect: จับตาสิ่งที่เกิดกับตัวแปร query ถอยข้อมูลที่มาจาก Query Param นอกระบบกลับไปสแตนด์บายบน SearchInput ด้วย
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // handleSearch: ตัวแปรฟังก์ชัน ทำหน้าที่ดักจับเหตุการณ์กดยืนยันปุ่มค้นหาบนฟอร์ม
  // event: พารามิเตอร์วัตถุเหตุการณ์จากการ submit (e) 
  const handleSearch = (event) => {
    event.preventDefault(); // เบรคไม่ให้ฟอร์มโหลดหน้าตัวเองใหม่

    // trimmedQuery: ตัดขอบช่องว่างกวนใจทิ้งไปก่อนเอาเข้าสู่ URL
    const trimmedQuery = searchInput.trim();

    if (!trimmedQuery) {
      // ถ้าช่องค้นหาดันว่างเปล่า ไม่ต้องยัดอะไรลง URL เคลียร์ URL param ทั้งหมดให้สะอาด
      setSearchParams({});
      return;
    }

    // เอาชุดข้อความนั้นแหละไปฉีดใส่พารามิเตอร์ URL ในตำแหน่ง q (เกิดเหตุการณ์ใหม่อย่างเช่น /search?q=abc)
    setSearchParams({ q: trimmedQuery });
  };

  // handleClear: ตัวแปรฟังก์ชัน ทำหน้าที่เคลียร์ทิ้งทุกอย่างเมื่อกด "ล้างคำค้น"
  const handleClear = () => {
    setSearchInput("");
    setSearchParams({}); // นำพา URL ให้คลีนไร้มลทิน
  };

  // filteredPosts: ตัวแปรอาเรย์ สร้างโดยการร่อนกรอง (filter) จากตัวแปร posts ใหญ่
  // ทำงานก็ต่อเมื่อตัวแปร query บน URL มีข้อมูลพิมพ์ค้างอยู่
  const filteredPosts = query
    ? posts.filter((post) => {
        // normalizedQuery: ปรับข้อความของ query ให้เป็นอักษรพิมพ์เล็กหมด (Case-insensitive) เพิ่อลดปัญหาการเทียบพลาด
        const normalizedQuery = query.toLowerCase();

        // ตรวจว่าข้อความที่ต้องการค้นพบในชื่อโพสต์(title) หรือส่วนเนื้อหา(body) ใช่หรือไม่? 
        return (
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.body.toLowerCase().includes(normalizedQuery)
        );
      })
    : [];

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            color: "#2d3748",
            borderBottom: "2px solid #3182ce",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          🔍 ค้นหาโพสต์
        </h2>

        <form
          // แขวนฟังก์ชันรับผิดชอบ handleSearch ไว้กับเหตุการณ์ submit ของ form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
            background: "white",
            border: "1px solid #dbeafe",
            borderRadius: "10px",
            padding: "1rem",
            boxShadow: "0 8px 24px rgba(30, 64, 175, 0.08)",
          }}
        >
          <input
            type="text"
            placeholder="พิมพ์คำที่อยากค้นหา..."
            value={searchInput} // ยึดติดช่องกรอกกับ State searchInput
            onChange={(event) => setSearchInput(event.target.value)} // ดักตัวอักษรอัปเดตขึ้น State
            autoFocus
            style={{
              flex: "1 1 320px",
              padding: "0.75rem 1rem",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "0.75rem 1.25rem",
              border: "none",
              borderRadius: "8px",
              background: "#1e40af",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ค้นหา
          </button>

          <button
            type="button"
            onClick={handleClear} // แขวนฟังก์ชันรับผิดชอบไว้เพื่อล้างทั้งหมดเมื่อคลิก
            style={{
              padding: "0.75rem 1.25rem",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              background: "white",
              color: "#475569",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ล้างคำค้น
          </button>
        </form>
      </div>

      {query && (
        <p style={{ color: "#475569", marginBottom: "1rem" }}>
          ผลการค้นหาสำหรับ: <strong>"{query}"</strong> พบ {filteredPosts.length} รายการ
        </p>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
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
      ) : !query ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#64748b",
            background: "white",
            border: "1px dashed #cbd5e1",
            borderRadius: "10px",
          }}
        >
          <p style={{ fontSize: "1.05rem", marginBottom: "0.75rem" }}>
            พิมพ์คำที่ต้องการ แล้วกดค้นหาได้เลย
          </p>
          <p style={{ margin: 0 }}>ระบบจะค้นหาจากทั้งชื่อโพสต์และรายละเอียดโพสต์</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        // ปล่อยอาเรย์ filteredPosts เข้ามาวาดกล่องทีละการ์ด
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div style={{ textAlign: "center", padding: "2rem", color: "#718096" }}>
          <p style={{ fontSize: "1.1rem" }}>ไม่พบโพสต์ที่ตรงกับคำค้นหาของคุณ</p>
          <Link to="/" style={{ color: "#1e40af", display: "inline-block", marginTop: "1rem" }}>
            ← กลับไปดูเนื้อหาทั้งหมดที่หน้าหลัก
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
