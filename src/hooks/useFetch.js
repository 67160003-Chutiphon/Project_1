import { useState, useEffect } from "react";

// useFetch: ฟังก์ชัน Custom Hook ที่ถูกสร้างขึ้นมาเพื่อรับผิดชอบการดึงข้อมูลจาก API (Data Fetching) โดยเฉพาะ
// ช่วยลดความซ้ำซ้อนของการเขียน fetch() แบบเดิมในหลายๆ Component
// เชื่อมต่อไปยัง: Component หลายๆ ตัว เช่น HomePage, PostDetailPage, UserList เพื่อดึงข้อมูลมาแสดงหน้าจอ
// ตัวแปร url: พารามิเตอร์รับค่าที่อยู่ของ API Endpoint ที่ต้องการดึงข้อมูล
function useFetch(url) {
  
  // data: State ตัวแปรทำหน้าที่เก็บข้อมูลที่ตอบกลับ (Response Data) จาก API เมื่อดึงข้อมูลสำเร็จ 
  // ตัวเริ่มต้นคือ null เพราะตอนแรกยังไม่มีข้อมูล
  // setData: ฟังก์ชันใช้อัปเดตตัวแปร data
  const [data, setData] = useState(null); 

  // loading: State ตัวแปรแบบ Boolean ทำหน้าที่บอกว่าตอนนี้ "กำลังดึงข้อมูลอยู่" (true) หรือ "เสร็จแล้ว" (false)
  // ถูกใช้เพื่อเปิด-ปิด Component <LoadingSpinner /> เพื่อให้ผู้ใช้รู้ว่ากำลังโหลด
  // setLoading: ฟังก์ชันใช้อัปเดตตัวแปร loading
  const [loading, setLoading] = useState(true); 

  // error: State ตัวแปรทำหน้าที่เก็บข้อความแจ้งเตือน (Error Message) กรณีที่ดึงข้อมูลไม่สำเร็จ
  // setError: ฟังก์ชันใช้อัปเดตตัวแปร error
  const [error, setError] = useState(null); 

  // refetch: ฟังก์ชันรวบรวมขั้นตอนการทำงานดึงข้อมูล 
  // ถูกตั้งชื่อว่า refetch เพื่อให้ผู้ที่นำ hook ไปใช้เอาไปผูกกับปุ่มโหลดข้อมูลใหม่ได้ (Refresh button)
  const refetch = async () => {
    // รีเซ็ตสถานะก่อนเริ่มดึงข้อมูล
    setLoading(true);
    setError(null);
    try {
      // res: ตัวแปรเก็บ Object Response ที่ตอบกลับมาจากเซิร์ฟเวอร์หลังทำการเรียก fetch ไปที่ url
      const res = await fetch(url);
      
      // ถ้า res.ok ไม่เป็นจริง (เช่น ติด 404, 500) ให้สร้างข้อผิดพลาดแบบจงใจ (Throw Exception) โยนไปที่บล็อก catch
      if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      
      // result: ตัวแปรเก็บข้อมูลออบเจ็กต์/อาร์เรย์ของแท้ ที่แปลงสภาพมาจาก Payload JSON ของ Response (res)
      const result = await res.json();
      
      // การทำงานสำเร็จ นำ result ไปอัปเดตลง state ตัวแปร data
      setData(result); 
    } catch (err) {
      // err: ตัวแปรเก็บข้อมูลข้อผิดพลาด (Exception Object)
      // นำ err.message ไปอัปเดตลง state ตัวแปร error เพื่อนำไปแสดงผลบนหน้าจอให้ผู้ใช้รู้
      setError(err.message); 
    } finally {
      // บล็อก finally จะทำงานเสมอในตอนสุดท้าย ไม่ว่าจะทำ try สำเร็จหรือวิ่งเข้า catch
      // ทำการเปลี่ยนสถานะ loading ให้เป็น false เพราะทำงานจบกระบวนการแล้ว
      setLoading(false); 
    }
  };

  // useEffect (Side effect): สั่งให้ฟังก์ชันทำงานเมื่อ Component ถูกสร้างขึ้นใหม่ครั้งแรก (Mount) 
  // หรือทุกครั้งที่ค่าตัวแปร url เปลี่ยนแปลง ระบบอัตโนมัติจะเรียกใช้ refetch() ใหม่ทันที
  useEffect(() => {
    refetch();
  }, [url]);

  // สิ่งที่ Custom Hook ส่งกลับคืนให้ Component ไปใช้งาน คือ Object ที่มีตัวแปร data, loading, error และฟังก์ชัน refetch
  return { data, loading, error, refetch };
}

export default useFetch;
