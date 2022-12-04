import styles from '../../styles/purchase.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../layout/header';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const cookies = context.req.cookies;
  console.log(`cookie:${cookies.id}`);
  const res = await fetch(
    `http://localhost:8000/carts?userId=${cookies.id}`
  );
  const carts = await res.json();
  const purchaseHistories = {
    userId: cookies.id,
    items: carts,
  };
  await fetch(`http://localhost:8000/purchaseHistories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchaseHistories),
  }).then(() => {
    carts.forEach((cart: any) => {
      fetch(`http://localhost:8000/carts/${cart.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseHistories),
      });
    });
  });
  return {
    props: { carts },
  };
};

export default function PurchaseCompletion() {
  return (
    <>
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

          <div className={styles.purchasedBottonsDisplay}>
            <div className={styles.purchased_buttons}>
              <div className={styles.bottonC}>
                <Link href="/users">
                  <button className={styles.purchased_button}>
                    ご購入履歴を確認する
                  </button>
                </Link>
              </div>
              <div className={styles.bottonC}>
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
      <footer className={styles.footer}>
        <h1>RAKUTEIN</h1>
      </footer>
    </>
  );
}
