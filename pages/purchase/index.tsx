import Head from 'next/head';
import ItemData from '../../components/itemData';
import styles from '../../styles/purchase.module.css';
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies;
  console.log(cookies.id)
  const res = await fetch(`http://localhost:8000/users?id=${cookies.id}`);
  const users = await res.json();
  const user = users[0];
  console.log(user)
  return {
    props: { user }
  };
};

export default function PurchaseDisplay({user}:{user:any}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>購入画面</title>
      </Head>

      <ItemData user={user} />
    </div>
  );
}
