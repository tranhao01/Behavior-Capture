# 🎯 AI Behavioral Analyst Tester

Web app để test prompt phân tích hành vi người dùng với AI/LLM.
---
<img width="1569" height="799" alt="image" src="https://github.com/user-attachments/assets/a5ad38de-e34e-4d1f-a1a4-fc143324fb6d" />
<img width="1660" height="833" alt="image" src="https://github.com/user-attachments/assets/3d7b6bab-cb77-4adb-be30-0db85e2508a4" />

---
## Tính năng

- ✅ UI thân thiện để nhập dữ liệu JSON
- ✅ Mô phỏng kết quả phân tích AI
- ✅ Copy prompt template để dùng với ChatGPT/Gemini
- ✅ Dữ liệu mẫu sẵn có
- ✅ Responsive design

## Cách chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

App sẽ chạy tại http://localhost:3000

## Cách sử dụng

1. **Nhập dữ liệu**: Sửa JSON trong ô bên trái hoặc dùng dữ liệu mẫu
2. **Phân tích**: Click "🔍 Phân tích" để xem kết quả mô phỏng
3. **Copy Prompt**: Click "📋 Copy Prompt" để copy prompt hoàn chỉnh
4. **Dán vào AI**: Paste prompt vào ChatGPT/Gemini để phân tích thực tế

## Cấu trúc dữ liệu

```json
{
  "event": "Tên sự kiện",
  "event_attributes": {
    "product_id": "SKU",
    "category": "Danh mục",
    "quantity": 1,
    "price": 100000,
    "channel": "Kênh marketing"
  },
  "user_attributes": {
    "user_id": "ID người dùng",
    "device": "Thiết bị",
    "location": "Vị trí",
    "purchase_history": []
  }
}
```

## Tích hợp thực tế

Để tích hợp với hệ thống thực:
- Thay thế `simulateAnalysis()` bằng API call đến OpenAI/Gemini
- Kết nối database để lấy dữ liệu user/event
- Thêm authentication và logging
