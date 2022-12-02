import styles from '../styles/purchase.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import React, { useState } from 'react';


const ItemData: React.FunctionComponent<{ user: any, carts: any }> = ({ user, carts }) => {
  const router = useRouter();

  carts.forEach((cart: any) => {
    cart.date = (new Date()).toLocaleString('ja-JP');
  })


  const purchaseHistories = {
    userId: user.id,
    items: carts
  }

  console.log(carts)

  const cartPatch = {
    deleted: true
  }


  // 購入履歴jsonサーバーに購入商品を追加する処理[始まり]
  const handler = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:8000/purchaseHistories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseHistories),
    })
      .then(() => {
        router.push('/purchase/purchased');
      });
  }
  // 購入履歴jsonサーバーに購入商品を追加する処理[終わり]


  // 合計金額を算出する処理[始まり]
  const priceArray: any[] = [];
  carts.forEach((element: any) => {
    const multiPrice = element.price * element.countity;
    console.log(multiPrice);
    priceArray.push(multiPrice)
  })
  const initialValue = 0;
  const sumPrice = priceArray.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    initialValue
  );
  // 合計金額を算出する処理[終わり]


  return (
    <>
      <section className={styles.itemdata_main}>
        <main className="purchase_main">
          <h1 className={styles.title}>ご注文内容確認</h1>
        </main>
        <div>
          <h2 className={styles.purchase_h2}>配送先住所</h2>

          <p>
            お名前：{user.firstName}{user.lastName}&nbsp;({user.firstNameKana}{user.lastNameKana})
          </p>
          <p>
            電話番号：{user.tel}
          </p>
          <p>
            郵便番号：{user.postCode}
          </p>
          <p>
            住所：{user.prefecture}{user.city}{user.aza}{user.building}
          </p>
        </div>
        <div>
          <h2 className={styles.purchase_h2}>決済方法</h2>
          <form>
            <p>
              <input
                type="radio"
                name="paymentMethod"
                value="クレジットカード"
                id="pay_credit"
              />
              <label htmlFor="pay_credit">クレジットカード</label>
            </p>
            <p>
              <input
                type="radio"
                name="paymentMethod"
                value="代引き"
                id="cash_delivery"
                defaultChecked
              />
              <label htmlFor="cash_delivery">代引き</label>
            </p>
          </form>
        </div>

        <div>
          <h2 className={styles.purchase_h2}>ご注文内容</h2>
          <section className={styles.purchase_display}>
            {carts.map((cart: any) => {
              return (
                <div className={styles.itemDetail} key={cart.id}>
                  <Image
                    src={cart.imageUrl}
                    width={64}
                    height={64}
                    alt="商品画像"
                  />
                  <h4 className={styles.index_text}>商品名</h4>
                  {cart.name}
                  <p>
                    フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.style}>
                      &nbsp;{cart.flavor}&nbsp;
                    </span>
                  </p>

                  <p>
                    数量 &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.style}>
                      &nbsp;{cart.countity}&nbsp;
                    </span>
                  </p>
                  <p>
                    小計 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                    <span className={styles.style}>
                      &nbsp;{cart.price * cart.countity}&nbsp;
                    </span>
                  </p>
                </div>
              )
            })}
          </section>
        </div>
        <br />
        <br />
        <br />

        <div style={{ textAlign: "right" }}><u>合計金額:{sumPrice}円</u></div>
        <br />
        <br />

        <section className={styles.button_display}>
          <Link href="/cart">
            <button className={styles.btnA}>
              <span>キャンセル</span>
            </button>
          </Link>


          <button className={styles.btnB}
            onClick={handler}
          >
            <span>ご注文を確定する</span>
          </button>

        </section>
      </section>
    </>
  );
}

export default ItemData;
