import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/item_detail.module.css';

const ItemDetail: NextPage = () => {
  return (
    <>
      <div className={styles.detail_page}>
        <div>
          <Image
            className={styles.detail_img}
            src={''}
            alt="商品画像"
            width={50}
            height={50}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.detail_title}>
            <h4>商品名</h4>
          </div>
          <div className={styles.explain}>
            <p className={styles.explain_title}>商品説明</p>
            <p className={styles.explain_text}>
              テキストテキストテキストテキストテキスト
              <br />
              テキストテキストテキストテキストテキスト
            </p>
          </div>
          <div className={styles.ingredient}>
            <p className={styles.ingredient_title}>成分</p>
            <p className={styles.ingredient_text}>
              テキストテキストテキストテキストテキスト
              <br />
              テキストテキストテキストテキストテキスト
              <br />
              テキストテキストテキストテキストテキスト
            </p>
          </div>
          <div className={styles.flavor}>
            <p className={styles.flavor_title}>フレーバー</p>
            <select className={styles.select}>
              <option>ココア</option>
              <option></option>
              <option></option>
              <option></option>
              <option></option>
            </select>
          </div>
          <div className={styles.quantity}>
            <p className={styles.quantity_title}>数量</p>
            <select className={styles.select}>
              <option>1</option>
              <option></option>
              <option></option>
              <option></option>
              <option></option>
            </select>
          </div>
          <div className={styles.total}>
            <p className={styles.total_title}>合計金額</p>
            <p>円</p>
          </div>
          <div className={styles.cart}>
            <button className={styles.cart_button}>
              カートに追加
            </button>
            <div>
              <p>
                お気に入り登録<span>☆</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
