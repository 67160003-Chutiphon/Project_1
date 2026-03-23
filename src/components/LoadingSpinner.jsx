// LoadingSpinner: คอมโพเนนต์แสดงผลหน้าต่างหรือวงกลมกำลังโหลดแบบคลุมเครือ (Indeterminate Indicator)
// เชื่อมต่อไปยัง: ทุกไฟล์ที่มีการดึงข้อมูลจาก API (เช่น HomePage, UserList, CommentList, PostDetailPage) 
// เพื่อใช้แสดงขึ้นมาคั่นจังหวะในระหว่างที่ตัวแปร state "loading" มีค่าเป็น true
function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0",
          borderTopColor: "#1e40af",
          borderRadius: "50%",
          // การหมุนด้วยแอนิเมชัน spin อย่างต่อเนื่อง (infinite)
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ marginTop: "1rem" }}>กำลังโหลด...</p>
      {/* 
        แท็ก <style>: ใช้เขียน CSS แทรกใน Component เพื่อสร้างคีย์เฟรม '@keyframes spin'
        ทำหน้าที่บอกให้บราวเซอร์หมุน (rotate) องค์ประกอบวงกลมข้างบนไป 360 องศา  
      */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingSpinner;
