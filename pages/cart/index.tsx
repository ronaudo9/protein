import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/cart.module.css';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  const res = await fetch(
    `http://localhost:8000/carts?userId=${cookies.id}`
  );
  const users = await res.json();
  // const user = users[0];
  // console.log(user);

  return {
    props: { users },
  };
};

const data = {};

const Cart = ({ users }: any) => {
  const router = useRouter();

  // 削除
  function deleteItem(users: any) {
    fetch(`http://localhost:8000/carts/${users.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.reload();
  }

  // 小計・合計
  const priceArray: any[] = [];

  users.forEach((element: any) => {
    const multiPrice = element.price * element.countity;
    console.log(multiPrice);
    priceArray.push(multiPrice);
  });

  const initialValue = 0;
  const sumPrice = priceArray.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    initialValue
  );


  const routerHandler = () => {
    if (users[0]) {
      router.push('/purchase')
    } else {
      alert('商品一覧から商品を選んでカートに入れてください')
      router.push('/items')
    }
  }

  return (
    <>
      <h4 className={styles.cart_title}>カート</h4>
      <ul className={styles.cart_menu}>
        <p>アイテム</p>
        <p>数量</p>
        <p>価格(税込み)</p>
      </ul>
      <section className={styles.cart_content}>
        {users.map((cart: any) => (
          <div key={cart.id}>
            <Image
              className={styles.cart_img}
              src={cart.imageUrl}
              alt="商品画像"
              width={300}
              height={300}
            />
            <p>{cart.name}</p>
            <p>{cart.countity}</p>
            <p>{cart.price * cart.countity}</p>
            <button onClick={() => deleteItem(cart)}>削除</button>
          </div>
        ))}
      </section>

      <section>
        <div className={styles.cart_total}>
          <p>購入金額:</p>
          <p className={styles.total}>{sumPrice}</p>
          <button className={styles.purchase} onClick={routerHandler}>購入する</button>
        </div>
      </section>
    </>
  );
};

export default Cart;
