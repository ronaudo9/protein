import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/subscription.module.css';
import Header from '../layout/header';

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const cookies = context.req.cookies;
  console.log(`cookie:${cookies.id}`);
  const res = await fetch(
    `http://localhost:8000/subscriptionCart?userId=${cookies.id}`
  );
  const subscriptionCart = await res.json();
  subscriptionCart.forEach((cart: any) => {
    cart.date = new Date().toLocaleString('ja-JP');
  });
  const subscription = {
    userId: cookies.id,
    items: subscriptionCart,
  };
  // const subscription = {
  //   userId: cookies.id,
  //   items: subscriptionCart,
  // };
  // await fetch(`http://localhost:8000/subscription`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(subscription),
  // }).then(() => {
  //   subscriptionCart.forEach((cart: any) => {
  //     fetch(`http://localhost:8000/carts/${cart.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(subscription),
  //     });
  //   });
  // });
  return {
    props: { subscriptionCart, subscription },
  };
};

export default function PurchaseCompletion({
  subscriptionCart,
  subscription,
}: any) {
  const router = useRouter();
  const handler = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:8000/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    }).then(() => {
      deleteCarts(event);
      router.push('/purchase/purchased/');
    });
  };

  const deleteCarts = (event: any) => {
    event.preventDefault();
    const data = {};
    subscriptionCart.forEach((cart: any) => {
      fetch(`http://localhost:8000/subscriptionCart/${cart.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    });
  };

  return (
    <>
      <Header />
      <hr />
      <div className={styles.main}>
        <div className={styles.element}>
          <div>
            <p className={styles.title}>
              定期購入注文を確定しますか？
            </p>
            <div className={styles.ps}>
              <p className={styles.text_left}>
                ※定期購入はご登録されているクレジットカード支払いのみです。
                <br />
                ※配送頻度は本日から30日単位で1個発送されます。
              </p>
            </div>
          </div>
          <button
            onClick={handler}
            className={styles.purchased_buttonA}
          >
            <a>確定</a>
          </button>
          &nbsp;{' '}
          <Link
            href={`javascript:history.back()`}
            className={styles.border}
          >
            <br />
            <br />
            前のページに戻る→
          </Link>
        </div>
      </div>
      <footer className={styles.footer}>
        <h1>RAKUTEIN</h1>
      </footer>
    </>
  );
}
