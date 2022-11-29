import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/cart.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  console.log(cookies.id);
  const res = await fetch(
    `http://localhost:8000/carts?userId=${cookies.id}`
  );
  const user = await res.json();
  // const user = users[0];
  console.log(user);
  return {
    props: { user },
  };
};

const Cart: NextPage = ({ user }: any) => {
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);

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

    const nextTotal = user.price * nextCount;
    setTotal(nextTotal);

    addHandlerNext(user.price);
  };

  const clickHandlerPrev = () => {
    const prevCount = count - 1;
    if (prevCount <= 0) {
      setCount(0);
    } else {
      setCount(prevCount);
    }

    const prevTotal = user.price * count;
    setTotal(prevTotal);

    addHandlerPrev(user.price);
  };
  return (
    <>
      <div>
        <h4 className={styles.cart_title}>カート</h4>
        <ul className={styles.cart_menu}>
          <p>アイテム</p>
          <p>数量</p>
          <p>価格(税込み)</p>
        </ul>

        <section className={styles.cart_content}>
          <Image
            className={styles.cart_img}
            src={''}
            alt="商品画像"
            width={300}
            height={300}
          />
          <p>{user.name}</p>
          <button type="button" onClick={clickHandlerNext}>+</button>
          <p>{user.countity}</p>
          <button type='button' onClick={clickHandlerPrev}>-</button>
          <p>{user.price}</p>
          <button>削除</button>
        </section>

        <section>
          <div className={styles.cart_total}>
            <p>購入金額:</p>
            <p className={styles.total}>{total.toLocaleString()}</p>
            <button className={styles.purchase}>購入する</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
