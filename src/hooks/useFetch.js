import { useState, useEffect } from "react";

// Hook useFetch ทำหน้าที่ดึงข้อมูลจาก API, จัดการสถานะ loading และ error
function useFetch(url) {
  const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
  const [loading, setLoading] = useState(true); // สถานะการโหลด (เริ่มแรกเป็น true)
  const [error, setError] = useState(null); // เก็บข้อความแจ้งเตือนถ้ามีข้อผิดพลาด

  // ฟังก์ชันสำหรับเรียก fetch ใหม่ (เพื่อใช้กับปุ่ม Reload)
  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      const result = await res.json();
      setData(result); // เก็บข้อมูลลง state
    } catch (err) {
      setError(err.message); // เก็บ error ลง state
    } finally {
      setLoading(false); // ไม่ว่าจะสำเร็จหรือพัง ก็ปิด loading
    }
  };

  useEffect(() => {
    // ถูกเรียกตอน component mount และเมื่อ url เปลี่ยนแปลง
    refetch();
  }, [url]);

  return { data, loading, error, refetch };
}

export default useFetch;
