# Task #1: Components, JSX, Props, Lists

สร้างโครงของ **DevBoard** โดยแบ่ง UI เป็น component ย่อย ส่งข้อมูลด้วย props และใช้ `.map()` render รายการ

## Setup

```bash
npm create vite@latest devboard -- --template react
cd devboard
npm install
npm run dev
```

ลบเนื้อหาใน `src/App.jsx` และ `src/App.css` ออก แล้ว push ขึ้น GitHub ก่อนเริ่ม

## โครงสร้างไฟล์

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── PostCard.jsx
│   ├── PostList.jsx
│   └── UserCard.jsx
└── App.jsx
```

## ข้อมูล Hardcode

เพิ่มใน `src/App.jsx`:

```jsx
const POSTS = [
  { id: 1, title: "React คืออะไร?", body: "React เป็น library สำหรับสร้าง UI ที่ทำให้ code อ่านง่ายและดูแลรักษาได้" },
  { id: 2, title: "ทำไมต้องใช้ Components?", body: "Components ช่วยให้เราแบ่ง UI ออกเป็นชิ้นเล็ก ๆ ที่ reuse ได้" },
  { id: 3, title: "JSX คืออะไร?", body: "JSX คือ syntax ที่ช่วยให้เราเขียน HTML ใน JavaScript ได้อย่างสะดวก" },
  { id: 4, title: "Props ทำงานอย่างไร?", body: "Props คือ argument ที่ส่งให้ component เหมือนกับการส่งพารามิเตอร์ให้ฟังก์ชัน" },
];

const USERS = [
  { id: 1, name: "สมชาย ใจดี", email: "somchai@dev.com" },
  { id: 2, name: "สมหญิง รักเรียน", email: "somying@dev.com" },
  { id: 3, name: "วิชาญ โค้ดเก่ง", email: "wichan@dev.com" },
];
```

---

## Activity 1 — Navbar

```jsx
function Navbar() {
  return (
    <nav style={{ background: "#1e40af", color: "white", padding: "1rem 2rem" }}>
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>กระดานนักพัฒนา</p>
    </nav>
  );
}

export default Navbar;
```

## Activity 2 — PostCard

รับ props `title` และ `body`

```jsx
function PostCard({ title, body }) {
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem", marginBottom: "1rem", background: "white" }}>
      <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>{title}</h3>
      <p style={{ margin: 0, color: "#4a5568", lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

export default PostCard;
```

## Activity 3 — PostList

รับ `posts` เป็น array แล้ว `.map()` render PostCard

```jsx
import PostCard from "./PostCard";

function PostList({ posts }) {
  return (
    <div>
      <h2 style={{ color: "#2d3748", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}>
        โพสต์ล่าสุด
      </h2>
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
}

export default PostList;
```

> `key={post.id}` ต้องใส่ทุกครั้งที่ใช้ `.map()` ไม่งั้นจะมี warning ใน console

## Activity 4 — UserCard

```jsx
function UserCard({ name, email }) {
  const initials = name.split(" ").map((n) => n[0]).join("");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "0.75rem", background: "white" }}>
      <div style={{ width: "40px", height: "40px", background: "#1e40af", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

export default UserCard;
```

## Activity 5 — App.jsx

```jsx
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserCard from "./components/UserCard";

// ... POSTS และ USERS จากด้านบน

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        <div>
          <PostList posts={POSTS} />
        </div>
        <div>
          <h2 style={{ color: "#2d3748", borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}>สมาชิก</h2>
          {USERS.map((user) => (
            <UserCard key={user.id} name={user.name} email={user.email} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
```

---

## ส่งงาน

1. Commit และ push ขึ้น GitHub
2. Deploy บน Vercel แล้วส่ง GitHub URL และ Vercel URL ให้อาจารย์

---

## Challenge

ทำเสร็จแล้วลองทำเพิ่ม ถ้าทำได้และอธิบายได้ในวันนำเสนอจะได้คะแนนเพิ่ม 2.5 คะแนน (ดิบ ไม่หาร)

**ระดับ 1** — สร้าง `PostCount` ที่รับ `count` แล้วแสดง "โพสต์ทั้งหมด: 4 รายการ" ใต้หัวข้อใน PostList

**ระดับ 2** — ปรับ `UserCard` ให้ avatar มีสีต่างกันตามตัวอักษรแรกของชื่อ (Hint: `name.charCodeAt(0) % 3`)

**ระดับ 3** — สร้าง `PostSkeleton` แสดง placeholder สีเทาเหมือนหน้ากำลังโหลด (Hint: `div` สีเทา height คงที่ แสดง 3 ก้อน)