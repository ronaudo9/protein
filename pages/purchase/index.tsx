import Head from 'next/head';
import ItemData from '../../components/itemData';
import styles from '../../styles/purchase.module.css';
import { GetServerSideProps } from "next";
import Header from '../layout/header';


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies;
  const res = await fetch(`http://localhost:8000/users?id=${cookies.id}`);
  const users = await res.json();
  const user = users[0];
  console.log(user)

  const resCarts = await fetch(`http://localhost:8000/carts?userId=${cookies.id}`);
  const carts = await resCarts.json();
  console.log(carts)

  return {
    props: {
      user: user,
      carts: carts
    }
  };
};

export default function PurchaseDisplay({ user, carts }: { user: any, carts: any }) {
  // const {user,carts} = props
  console.log(user)
  console.log(carts)

  return (
    <div className={styles.container}>
      <Header />
      <hr className={styles.hr}></hr>
      <Head>
        <title>ご注文内容確認</title>
      </Head>
      <ItemData user={user} carts={carts}
      />
    </div>
  );
}
