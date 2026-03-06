export interface CourseNode {
  id: number;
  title: string;
  description: string;
  subTopics: string[];
  position: { top: string; left: string };
  line: { x1: string; y1: string; x2: string; y2: string };
}

export const COURSE_DATA: CourseNode[] = [
  {
    id: 1,
    title: "1. 趨勢與核心邏輯",
    description: "探討 AI Agent 與傳統機器人的差異及商業場景拆解。",
    subTopics: [
      "1-1 為什麼是現在？ 傳統客服機器人 vs. AI Agent 的本質差異。",
      "1-2 創業者的算盤： 計算「人機協作」下的培訓成本與人力支出對比。",
      "1-3 商業場景拆解： 除了客服，還能做電商爬蟲、自動化對帳與社群監控。"
    ],
    position: { top: "20%", left: "75%" },
    line: { x1: "50%", y1: "50%", x2: "75%", y2: "20%" }
  },
  {
    id: 2,
    title: "2. 環境部署",
    description: "算力選型、Python 環境搭建與主流 AI API 串接。",
    subTopics: [
      "2-1 算力選型： 本地運算 vs. 雲端部署（如：Vercel, Docker）的優劣分析。",
      "2-2 軟體環境： Python 基礎環境搭建、Playwright 瀏覽器控制庫安裝。",
      "2-3 API 串接： 如何整合 OpenAI (GPT-4o) 或 Anthropic (Claude 3.5) 作為大腦。"
    ],
    position: { top: "55%", left: "85%" },
    line: { x1: "50%", y1: "50%", x2: "85%", y2: "55%" }
  },
  {
    id: 3,
    title: "3. 功能實踐",
    description: "視覺感知、記憶管理與異常處理的熔斷機制。",
    subTopics: [
      "3-1 視覺感知： 讓 AI 「看懂」網頁上的 DOM 結構與按鈕位置。",
      "3-2 記憶管理： 如何讓 AI 記得上一個客戶說過的話（Context window 處理）。",
      "3-3 異常處理： 當網頁報錯或客戶亂說話時，如何設定「人工介入」的熔斷機制。"
    ],
    position: { top: "85%", left: "50%" },
    line: { x1: "50%", y1: "50%", x2: "50%", y2: "85%" }
  },
  {
    id: 4,
    title: "4. 風險與道德",
    description: "應對反爬蟲挑戰、隱私保護與法律合規性。",
    subTopics: [
      "4-1 技術瓶頸： 反爬蟲機制 (Cloudflare) 的挑戰與延遲問題。",
      "4-2 安全與隱私： 如何保護客戶個資不被上傳到公有模型進行訓練。",
      "4-3 法律與合規： 自動化操作是否違反平台服務條款 (ToS)。"
    ],
    position: { top: "60%", left: "15%" },
    line: { x1: "50%", y1: "50%", x2: "15%", y2: "60%" }
  },
  {
    id: 5,
    title: "5. 創業實戰",
    description: "串接通訊軟體與瀏覽器自動化，優化 Token 成本。",
    subTopics: [
      "5-1 實戰演練： 串接 LINE/WhatsApp 與瀏覽器自動化。",
      "5-2 效率優化： 如何縮短 AI 的思考時間與節省 API Token 費用。"
    ],
    position: { top: "25%", left: "20%" },
    line: { x1: "50%", y1: "50%", x2: "20%", y2: "25%" }
  }
];
