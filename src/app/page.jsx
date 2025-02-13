'use client';
import { useState } from 'react';

export default function Home() {
  // useStateを使った値（状態）管理
  const [getMessage, setGetMessage] = useState('');

  // FastAPIのエンドポイント設定
  const handleGetRequest = async () => {
    console.log("ボタンがクリックされました"); // ボタンがクリックされたことを確認
    try {
      const response = await fetch('http://localhost:8000/api/finance');
      console.log("レスポンスを受け取った:", response); // レスポンスを確認
      const data = await response.json();
      console.log("レスポンスデータ:", data); // レスポンスデータを確認
      setGetMessage(data.data ? JSON.stringify(data.data, null, 2) : data.error); // メッセージ表示
    } catch (error) {
      console.error('Error:', error); // エラーメッセージ表示
    }
  };

  // ユーザーインターフェースの構築
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Appleの株価取得アプリ</h1>
      <div className="space-y-8">
        {/* GETリクエスト */}
        <section>
          <h2 className="text-xl font-bold mb-4">GETリクエストを送信</h2>
          <button
            onClick={handleGetRequest}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            GETリクエストを送信
          </button>
          {getMessage && (
            <pre className="mt-2">サーバーからのGET応答: {getMessage}</pre>
          )}
        </section>
      </div>
    </div>
  );
}
