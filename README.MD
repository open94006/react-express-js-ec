# EC 專案

這是一個全端電子商務專案，前端使用 React (Vite)，後端使用 Express.js，兩者都採用 TypeScript。

## 功能特色

- **兩階段驗證 (2FA)**: 實作以增強安全性。
- **產品列表**: 顯示從後端獲取的產品列表。
- **計數器**: 一個簡單的計數器範例。
- **共用介面**: 示範如何在前端和後端之間共用 TypeScript 介面。

## 使用技術

### 前端 (Client)

- **React**: 用於建構使用者介面的 JavaScript 函式庫。
- **Vite**: 現代 Web 專案的快速建構工具。
- **TypeScript**: JavaScript 的超集，增加了靜態型別。
- **CSS**: 用於樣式設計。

### 後端 (Server)

- **Express.js**: 一個快速、無意見、極簡的 Node.js Web 框架。
- **TypeScript**: 用於型別安全的後端開發。
- **Node.js**: JavaScript 執行環境。

## 開始使用

請依照以下說明，在您的本機電腦上設定並執行此專案，以進行開發和測試。

### 先決條件

- Node.js (建議 LTS 版本)
- pnpm (或 npm/yarn)

### 安裝

1.  **複製儲存庫 (Repository):**

    ```bash
    git clone <repository_url>
    cd ec
    ```

2.  **安裝根專案 (共用部分) 的依賴項:**

    ```bash
    pnpm install
    ```

3.  **安裝客戶端 (前端) 的依賴項:**

    ```bash
    cd client
    pnpm install
    cd ..
    ```

4.  **安裝伺服器端 (後端) 的依賴項:**

    ```bash
    cd server
    pnpm install
    cd ..
    ```

### 執行應用程式

1.  **啟動後端伺服器:**

    ```bash
    cd server
    pnpm dev
    # 或 npm run dev
    cd ..
    ```

2.  **啟動前端開發伺服器:**

    ```bash
    cd client
    pnpm dev
    # 或 npm run dev
    cd ..
    ```

    前端應用程式通常會在 `http://localhost:5173` 上可用。

## 專案結構

- `client/`: 包含 React 前端應用程式。
- `server/`: 包含 Express.js 後端應用程式。
- `shared/`: 包含客戶端和伺服器之間共用的程式碼 (例如 TypeScript 介面)。
