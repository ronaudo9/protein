// 商品一覧画面
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/items_index.module.css';
import ItemDisplayNew from '../../components/itemDisplayNew';
import Head from 'next/head';

const ItemDisplay: NextPage = () => {
  return (
    <>
      <Head>
        <h2 className={styles.title}>
          自分にあったプロテインを見つけよう
        </h2>
      </Head>

      <section className={styles.category}>
        <div className={styles.category1}>
          <p>種類</p>
          <select className={styles.select}>
            <option value="ホエイプロテイン">選択肢</option>
            <option>ホエイプロテイン</option>
            <option>カゼインプロテイン</option>
          </select>
        </div>

        <div className={styles.category2}>
          <p>フレーバー</p>
          <select>
            <option value="チョコ">選択肢</option>
            <option>チョコ</option>
            <option>バニラ</option>
            <option>抹茶</option>
            <option>バナナ</option>
            <option>ミルクティー</option>
            <option>選択肢サンプル6</option>
            <option>選択肢サンプル7</option>
          </select>
        </div>
      </section>

      <section>
        <ItemDisplayNew />
      </section>

      <section>
        <ul className={styles.next_list}>
          <li>
            <a href="">
              <span>1</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>2</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>3</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>次へ</span>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ItemDisplay;
