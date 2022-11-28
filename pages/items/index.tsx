// 商品一覧画面
// 表示の方でswrを書いて、PULLDOWNするとURLが変化するようにする。
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/items_index.module.css';
import ItemDisplayNew from '../../components/itemDisplayNew';
import Head from 'next/head';
import CategoryTypeSearch from 'components/categoryTypeSearch';
import useSWR from 'swr';
import { ChangeEvent, useState } from 'react';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

const ItemDisplay: NextPage = () => {
  const [resource, setResource] = useState('/api/items');
  const [category, setCategory] = useState('');
  const { data, error } = useSWR(resource, fetcher);
  if (error) return <div>Failed to Load</div>;
  if (!data) return <div>Loading...</div>;

  const categoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setResource(`/api/items?category=${e.target.value}`);
    console.log(e.target.value);
  };

  return (
    <>
      <Head>
        <h2 className={styles.title}>
          自分にあったプロテインを見つけよう
        </h2>
      </Head>
      <CategoryTypeSearch
        category={category}
        categoryHandler={categoryHandler}
      />

      <section className={styles.category}>
        <div className={styles.category2}>
          <p>フレーバー</p>
          <select>
            <option value="チョコ">選択してください</option>
            <option>チョコ</option>
            <option>バニラ</option>
            <option>抹茶</option>
            <option>バナナ</option>
            <option>ミルクティー</option>
            <option>ストロベリー</option>
            <option>ココナッツ</option>
            <option>ヨーグルト-ストロベリー-</option>
            <option>ノンフレーバー</option>
            <option>バナナ＆シナモン</option>
            <option>ピーチティー</option>
            <option>オレンジ</option>
            <option>パイナップル</option>
            <option>アイスレモンティー</option>
            <option>マスカット</option>
            <option>アイスラテ</option>
            <option>黒糖ミルクティー</option>
            <option>アップル</option>
            <option>ラズベリーレモネード</option>
            <option>キャラメル</option>
            <option>ミルクチョコレート</option>
            <option>北海道ミルク</option>
            <option>チョコレートスムーズ</option>
            <option>ストロベリークリーム</option>
          </select>
        </div>
      </section>

      <section>
        <ItemDisplayNew data={data} />
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
