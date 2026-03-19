import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PostCard from "../components/PostCard";
import useFetch from "../hooks/useFetch";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [searchInput, setSearchInput] = useState(query);
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");
  const posts = data || [];

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = searchInput.trim();

    if (!trimmedQuery) {
      setSearchParams({});
      return;
    }

    setSearchParams({ q: trimmedQuery });
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const filteredPosts = query
    ? posts.filter((post) => {
        const normalizedQuery = query.toLowerCase();

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
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
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
            onClick={handleClear}
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
