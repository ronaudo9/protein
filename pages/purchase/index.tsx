import Head from 'next/head';
import ItemData from '../../components/itemData';
import styles from '../../styles/purchase.module.css';
import Header from '../layout/header';

export default function PurchaseDisplay() {
  return (
    <div className={styles.container}>
      <Header />
      <hr className={styles.hr}></hr>
      <Head>
        <title>購入画面</title>
      </Head>

      <ItemData />
    </div>
  );
}
