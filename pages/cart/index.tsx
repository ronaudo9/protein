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
  console.log(cookies.id);
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

const Cart: NextPage<{ users: any }> = ({ users }) => {
  const [countity, setCountity] = useState('');
  const [count, setCount] = React.useState(0);
  const router = useRouter();

  const data = {
    countity: countity,
  };

  // 数量変更
  function countItem(item: any) {
    fetch(`http://localhost:8000/carts/${users.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.reload();
  }

  const clickHandlerNext = (item:any) => {
    const nextCount = count + 1;
    setCount(nextCount);
  };

  const clickHandlerPrev = (item:any) => {
    const prevCount = count - 1;
    if (prevCount <= 0) {
      setCount(0);
    } else {
      setCount(prevCount);
    }
  };


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
          {users.map((item: any) => (
            <div key={item.id}>
              <Image
                className={styles.cart_img}
                src={''}
                alt="商品画像"
                width={300}
                height={300}
              />
              <p>{item.name}</p>
              <button type="button" onClick={() => clickHandlerNext(item)}>
                +
              </button>
              <p>&nbsp;{count}&nbsp;</p>
              <button type="button" onClick={() => clickHandlerPrev(item)}>
                -
              </button>
              <p>{item.countity}</p>
              <p>{item.price}</p>
              <button type="button" onClick={() => deleteItem(item)}>
                削除
              </button>
            </div>
          ))}
        </section>

        <section>
          <div className={styles.cart_total}>
            <p>購入金額:</p>
            <p className={styles.total}></p>
            <button className={styles.purchase}>購入する</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
