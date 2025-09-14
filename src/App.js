import React, { useState } from 'react';
import './App.css';

const PROMPT_TEMPLATE = {
  role: "system",
  name: "AI Behavioral Analyst",
  instructions: [
    "Bạn là chuyên gia phân tích hành vi người dùng, tuân thủ bảo mật & pháp lý.",
    "Nhiệm vụ: nhận dữ liệu sự kiện (event logs) và hồ sơ người dùng (user profile) để phân tích hành vi.",
    "Luôn tách riêng 2 nhóm thuộc tính: (1) Event Attributes, (2) User Attributes.",
    "Luôn làm rõ: (a) hành vi hiện tại, (b) xu hướng/cluster, (c) nguy cơ/churn, (d) cơ hội cá nhân hóa.",
    "Đầu ra phải có: Summary → Phân tích chi tiết → Khuyến nghị.",
    "Không gán nhãn tính cách cứng (ví dụ: introvert/extrovert), chỉ được đưa ra xác suất hoặc segment hành vi.",
    "Không suy diễn về quan hệ xã hội trừ khi có dữ liệu quan hệ được cung cấp (referral, co-purchase, share).",
    "Luôn nêu giới hạn & độ tin cậy của phân tích."
  ]
};

const SAMPLE_DATA = {
  event: "Add to Cart",
  event_attributes: {
    product_id: "SKU12345",
    category: "Shoes",
    quantity: 2,
    price: 450000,
    channel: "Facebook Ads",
    timestamp: "2025-09-14T16:45:00Z"
  },
  user_attributes: {
    user_id: "U001",
    device: "Mobile iOS",
    location: "HCMC, VN",
    language: "vi",
    purchase_history: [
      { order_id: "O101", value: 1200000, date: "2025-07-21" },
      { order_id: "O102", value: 800000, date: "2025-08-10" }
    ]
  }
};

function App() {
  const [inputData, setInputData] = useState(JSON.stringify(SAMPLE_DATA, null, 2));
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockResult = {
        summary: "Người dùng U001 vừa thêm 2 đôi giày (450k/đôi) vào giỏ qua quảng cáo Facebook.",
        analysis: {
          current_behavior: "Quan tâm giày, nhạy với quảng cáo social.",
          trend: "Có xu hướng mua giày thể thao trung-cao cấp.",
          risk: "Thỉnh thoảng bỏ giỏ (need tracking checkout rate).",
          opportunity: "Upsell phụ kiện giày hoặc khuyến mãi free-ship."
        },
        recommendation: [
          "Gửi voucher free-ship trong 24h.",
          "Đề xuất giày mới cùng phân khúc giá.",
          "Đưa vào segment 'Mid-tier Shoe Buyers from FB Ads'."
        ],
        limitations: "Chưa có dữ liệu checkout → không thể đoán chắc tỷ lệ chuyển đổi."
      };
      
      setAnalysis(JSON.stringify(mockResult, null, 2));
      setIsAnalyzing(false);
    }, 2000);
  };

  const copyPrompt = () => {
    const fullPrompt = {
      ...PROMPT_TEMPLATE,
      user_input: JSON.parse(inputData)
    };
    navigator.clipboard.writeText(JSON.stringify(fullPrompt, null, 2));
    alert('Prompt đã được copy vào clipboard!');
  };

  return (
    <div className="app">
      <header>
        <h1>🎯 AI Behavioral Analyst Tester</h1>
        <p>Test prompt phân tích hành vi người dùng với dữ liệu thực tế</p>
      </header>

      <div className="container">
        <div className="section">
          <h2>📊 Dữ liệu đầu vào</h2>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Nhập dữ liệu JSON..."
            rows={15}
          />
          <div className="buttons">
            <button onClick={() => setInputData(JSON.stringify(SAMPLE_DATA, null, 2))}>
              Dùng dữ liệu mẫu
            </button>
            <button onClick={simulateAnalysis} disabled={isAnalyzing}>
              {isAnalyzing ? 'Đang phân tích...' : '🔍 Phân tích'}
            </button>
            <button onClick={copyPrompt}>
              📋 Copy Prompt
            </button>
          </div>
        </div>

        <div className="section">
          <h2>🤖 Kết quả phân tích</h2>
          <textarea
            value={analysis}
            readOnly
            placeholder="Kết quả sẽ hiển thị ở đây..."
            rows={15}
          />
        </div>
      </div>

      <div className="prompt-info">
        <h3>📝 Prompt Template</h3>
        <pre>{JSON.stringify(PROMPT_TEMPLATE, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;