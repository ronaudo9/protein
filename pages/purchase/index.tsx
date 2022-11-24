import Head from 'next/head';
import styles from '../../styles/purchase.module.css';

export default function PurchaseDisplay() {
  return (
    <div className={styles.container}>
      <Head>
        <title>購入画面</title>
      </Head>
      <main className="purchase_main">
        <h1 className={styles.title}>ご注文内容確認画面</h1>
      </main>
      <div>
        <h2 className={styles.purchase_h2}>配送先住所</h2>

        <p>お名前：{/*JSONから持ってくる */}</p>
        <p>電話番号：{/*JSONから持ってくる */}</p>
        <p>郵便番号：{/*JSONから持ってくる */}</p>
        <p>住所：{/*JSONから持ってくる */}</p>
      </div>
      <div>
        <h2 className={styles.purchase_h2}>決済方法</h2>
        <form>
          <p>
            <input
              type="radio"
              name="pay_credit"
              value="クレジットカード"
              id="pay_credit"
            />
            <label htmlFor="pay_credit">クレジットカード</label>
          </p>
          <p>
            <input
              type="radio"
              name="cash_delivery"
              value="代引き"
              id="cash_delivery"
            />
            <label htmlFor="cash_delivery">代引き</label>
          </p>
        </form>
      </div>
      <div>
        <h2 className={styles.purchase_h2}>ご注文内容</h2>
        ここに注文商品の一覧を表示する
        {/* ＜注文内容表示する関数/＞ */}
      </div>
      <button className={styles.purchase_button}>
        ご注文を確定する
      </button>
    </div>
  );
}
