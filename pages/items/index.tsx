// 商品一覧画面
// 表示の方でswrを書いて、PULLDOWNするとURLが変化するようにする。
import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/items_index.module.css';
import ItemDisplayNew from '../../components/itemDisplayNew';
import Head from 'next/head';
import Header from '../layout/header';
import CategoryTypeSearch from '../../components/categoryTypeSearch';
import useSWR from 'swr';
import { ChangeEvent, useState } from 'react';
import CategoryFlavorSearch from '../../components/categoryFlavorSearch';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

const ItemDisplay: NextPage = () => {
  const [resource, setResource] = useState('/api/items');
  const [category, setCategory] = useState('');
  const [flavor, setFlavor] = useState('');
  const { data, error } = useSWR(resource, fetcher);
  if (error) return <div>Failed to Load</div>;
  if (!data) return <div>Loading...</div>;

  const categoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setResource(`/api/items?category=${e.target.value}`);
    console.log(e.target.value);
  };

  const flavorHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFlavor(e.target.value);
    setResource(`/api/items?flavor_like=${e.target.value}`);
    // _like演算子でdbjson内の配列から検索できる
    console.log(e.target.value);
  };

  return (
    <>
      <Header />
      <hr className={styles.hr}></hr>
      <section className={styles.searchList}>
        <CategoryTypeSearch
          category={category}
          categoryHandler={categoryHandler}
        />

        <CategoryFlavorSearch
          flavor={flavor}
          flavorHandler={flavorHandler}
        />
      </section>
      <section className={styles.head}>
        <img
          className={styles.img}
          src="/images/strong.jpg"
          alt="画像"
        />
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
