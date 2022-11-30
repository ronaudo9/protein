import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/item_detail.module.css';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import React, { useState, useEffect } from 'react';
import Header from '../layout/header';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:8000/items/`);
  const items = await res.json();
  const paths = items.map((item: any) => ({
    params: {
      // idをdb.jsonファイルの文字列に合わせる
      id: item.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(
    `http://localhost:8000/items/${params!.id}`
  );
  const detail = await res.json();

  return {
    props: { detail },
    revalidate: 10,
  };
};

// detail getStaticPropsから取得
const ItemDetail: NextPage = ({ detail }: any) => {
  console.log(detail);

  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [userId, setUserId] = React.useState('');
  const [flavor, setFlavor] = React.useState('');

  const addHandlerNext = (sub: any) => {
    setTotal(total + sub);
  };

  const addHandlerPrev = (sub: any) => {
    if (total <= 0) {
      setTotal(0);
    } else {
      setTotal(total - sub);
    }
  };

  const clickHandlerNext = () => {
    const nextCount = count + 1;
    setCount(nextCount);

    const nextTotal = detail.price * nextCount;
    setTotal(nextTotal);

    addHandlerNext(detail.price);
  };

  const clickHandlerPrev = () => {
    const prevCount = count - 1;
    if (prevCount <= 0) {
      setCount(0);
    } else {
      setCount(prevCount);
    }

    const prevTotal = detail.price * count;
    setTotal(prevTotal);

    addHandlerPrev(detail.price);
  };

  const carts = {
    userId: Number(userId),
    itemid: detail.id,
    imageUrl: detail.imageUrl,
    name: detail.name,
    flavor: flavor,
    price: detail.price,
    countity: count,
  };

  useEffect(() => {
    const user = document.cookie;
    const userId = user.slice(3);
    console.log(userId);
    setUserId(userId);
  });

  const handler = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:8000/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carts),
    });
    // .then(() => {
    //   router.push('/');
    // });
  };

  return (
    <>
      <Header />
      <hr className={styles.hr}></hr>
      <div className={styles.detail_page}>
        <div>
          <Image
            className={styles.detail_img}
            src={detail.imageUrl}
            alt="商品画像"
            width={300}
            height={300}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.detail_title}>
            <h4>{detail.name}</h4>
          </div>
          <div className={styles.explain}>
            <p className={styles.explain_title}>商品説明</p>
            <p className={styles.explain_text}>
              {detail.description}
            </p>
          </div>
          <div className={styles.ingredient}>
            <p className={styles.ingredient_title}>成分</p>
            <p className={styles.ingredient_text}>{detail.content}</p>
          </div>

          <div className={styles.flavor}>
            <p className={styles.flavor_title}>フレーバー</p>
            <select
              className={styles.select}
              onChange={(e) => setFlavor(e.target.value)}
            >
              <option>{detail.flavor[0]}</option>
              <option>{detail.flavor[1]}</option>
              <option>{detail.flavor[2]}</option>
              <option>{detail.flavor[3]}</option>
              <option>{detail.flavor[4]}</option>
            </select>
          </div>
          <div className={styles.quantity}>
            <p className={styles.quantity_title}>数量</p>
            <button type="button" onClick={clickHandlerNext}>
              +
            </button>
            <p>&nbsp;{count}&nbsp;</p>
            <button type="button" onClick={clickHandlerPrev}>
              -
            </button>
            <p>&nbsp;個&nbsp;</p>
          </div>
          <div className={styles.total}>
            <p className={styles.total_title}>合計金額</p>
            <p>{total.toLocaleString()}円</p>
          </div>
          <div className={styles.cart}>
            <button className={styles.cart_button} onClick={handler}>
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
