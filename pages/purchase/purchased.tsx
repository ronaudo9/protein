import styles from '../../styles/purchase.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function PurchaseCompletion() {
  return (
    <div className={styles.container}>
      <Head>
        <title>購入完了</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.box1}>
          <h1 className={styles.purchased_title}>ご注文完了</h1>

          <h2 className={styles.purchased_h2}>
            ご注文ありがとうございました
          </h2>
          <p className={styles.purchased_p}>
            詳細はユーザー情報のご購入履歴をご確認ください。
          </p>
          {/* <Link href=> */}

          <button className={styles.purchased_button}>
            ご購入履歴を確認する
          </button>
          {/* </Link> */}
          <br />
          <Link href="../item">
            <button className={styles.purchased_button}>
              買い物を続ける
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
