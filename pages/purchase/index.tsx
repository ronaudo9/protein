import Head from 'next/head';
import ItemData from '../../components/itemData';
import styles from '../../styles/purchase.module.css';

export default function PurchaseDisplay() {
  return (
    <div className={styles.container}>
      <Head>
        <title>購入画面</title>
      </Head>

      <ItemData />
    </div>
  );
}
