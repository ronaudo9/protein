import styles from '../../styles/purchase.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/header';

export default function PurchaseCompletion() {
  return (
    <div className={styles.container}>
      <Header />
      <hr className={styles.hr}></hr>
      <Head>
        <title>購入完了</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.box1}>
          <h1 className={styles.purchased_title}>ご注文完了</h1>

          <div className={styles.purchased_h2}>
            <span className={styles.purchased_h2font}>
              ご注文ありがとうございました
            </span>
          </div>
          <p className={styles.purchased_p}>
            詳細はユーザー情報のご購入履歴をご確認ください。
          </p>
          {/* <Link href=> */}
          <div className={styles.purchasedBottonsDisplay}>
            <div className={styles.purchased_buttons}>
              <div>
                <Link href="/users">
                  <button className={styles.purchased_button}>
                    ご購入履歴を確認する
                  </button>
                </Link>
              </div>
              <div>
                <Link href="/items">
                  <button className={styles.purchased_button}>
                    買い物を続ける
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
