import styles from '../styles/purchase.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import React, { useState } from 'react';


// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const cookies = req.cookies;

//   return {
//     props: { carts },
//   };
// };

// const purchaseHistories: any = {
//   date: (new Date()).toUTCString(),
//   imageUrl: carts.url,
//   name: carts.name,
//   flavor: carts.flavor,
//   price: carts.price,
//   countity: carts.countity
// }

const ItemData: React.FunctionComponent<{ user: any, carts: any }> = ({ user, carts }) => {
  const router = useRouter();

  const priceArray: any[] = [];

  carts.forEach((element: any) => {
    const multiPrice = element.price * element.countity;
    console.log(multiPrice);
    priceArray.push(multiPrice)
  }
  )

  const initialValue = 0;
  const sumPrice = priceArray.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    initialValue
  );

  console.log(sumPrice);

  // const [carts, setCarts] = useState("purchaseHistories");

  // const handler = (event: any) => {
  //   event.preventDefault();
  //   fetch('/api/purchaseHistories', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(purchaseHistories),
  //   }).then(() => {
  //     router.push('/purchase/purchased');
  //   });
  // }

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
                  {/* <div className={styles.itemDetail} key={cart.id}> */}
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


          {/* <Link href="/purchase/purchased"> */}
          <button className={styles.btnB}
          // onClick={handler}
          >
            <span>ご注文を確定する</span>
          </button>
          {/* </Link> */}

        </section>
      </section>
    </>
  );
}

export default ItemData;
