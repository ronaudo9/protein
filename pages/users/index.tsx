import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from '../../styles/detail_user.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../layout/header';
import useSWR from 'swr';
import EmailEdit from '../../components/emailEdit';
import UsersElements from '../../components/usersElements';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  const res = await fetch(
    `http://localhost:8000/users?id=${cookies.id}`
  );
  const users = await res.json();
  const user = users[0];

  const resHistories = await fetch(
    `http://localhost:8000/purchaseHistories?userId=${cookies.id}`
  );
  const history = await resHistories.json();
  // history配列　[ { userId: 2, items: [ [Object] ], id: 2 } ][ { userId: 2, items: [ [Object] ], id: 2 } ]

  const itemsArray: any[] = [];

  //element { userId: 2, items: [ [Object] ], id: 2 } { userId: 2, items: [ [Object] ], id: 2 }
  history.forEach((element: any) => {
    const items = element.items;
    //items配列 [{userId: 2,itemId: 1,imageUrl: '/images/impact_whey_protein.jpg',name: 'Impact ホエイ プロテイン',flavor: 'チョコ',price: 1990,countity: 1,id: 2,date: '2022/12/1 11:12:47'}]

    items.forEach((item: any) => {
      itemsArray.push(item);
    });
  });
  console.log(JSON.stringify(itemsArray));
  //サブスク
  const regular = await fetch(
    `http://localhost:8000/subscription?userId=${cookies.id}`
  );
  const leave = await regular.json();

  const subscriptionArray: any[] = [];

  leave.forEach((element: any) => {
    const items = element.items;
    // console.log(`2${items}`)

    items.forEach((item: any) => {
      subscriptionArray.push(item);
    });
  });
  //サブスクの履歴
  const past = await fetch(
    `http://localhost:8000/subscriptionHistories?userId=${cookies.id}`
  );

  const remain = await past.json();

  const subscriptionHistoriesArray: any[] = [];

  remain.forEach((element: any) => {
    const items = element.items;

    items.forEach((item: any) => {
      subscriptionHistoriesArray.push(item);
    });
  });

  return {
    props: {
      user,
      itemsArray,
      subscriptionArray,
      leave,
      subscriptionHistoriesArray,
      cookies,
    },
  };
};

const UserDetails = ({
  user,
  subscriptionArray,
  itemsArray,
  leave,
  subscriptionHistoriesArray,
  cookies,
}: any) => {
  //サブスクからサブスク購入履歴への処理

  const router = useRouter();
  const handler = (event: any) => {
    // console.log(subscriptionArray)
    subscriptionArray.forEach((cart: any) => {
      cart.date = new Date().toLocaleString('ja-JP');
    });
    const purchaseHistories = {
      userId: cookies.id,
      items: subscriptionArray,
    };
    fetch(`http://localhost:3000/api/subscriptionHistories/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseHistories),
    }).then(() => {
      deleteCarts(event);
      router.reload();
    });
  };

  const data = {};

  const deleteCarts = (event: any) => {
    leave.forEach((del: any) => {
      fetch(`http://localhost:3000/api/subscription/${del.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(data),
      });
    });
  };
  return (
    <>
      <Header />
      <hr className={styles.hr}></hr>
      <Head>
        <title>ユーザー情報</title>
      </Head>
      <h1 className={styles.title}>ユーザー情報</h1>
      <div className={styles.main}>
        <div className={styles.indent}>
          <h3>目次</h3>
          <div>
            <p className={styles.index_text}>
              <Link href="#user_element">基本情報</Link>
            </p>
            <p className={styles.index_text}>
              <Link href="#user_purchased">ご購入履歴</Link>
            </p>
            <p className={styles.index_text}>
              <Link href="#user_subscription">継続中の定期購入</Link>
            </p>
            <p className={styles.index_text}>
              <Link href="#user_subscriptionHistories">
                定期購入の履歴
              </Link>
            </p>
          </div>
        </div>

        <section className={styles.element}>
          <h2 className={styles.title_element} id="user_element">
            基本情報
          </h2>

          <UsersElements user={user} />
        </section>

        <section className={styles.purchased}>
          <h2 className={styles.title_purchased} id="user_purchased">
            ご購入履歴
          </h2>
          {itemsArray.map((item: any) => {
            return (
              <div key={item.id}>
                <div>
                  <h3>購入日時：{item.date}</h3>
                  <div>
                    <div className={styles.list}>
                      <Image
                        src={item.imageUrl}
                        width={260}
                        height={260}
                        alt="商品画像"
                        className={styles.img}
                      />
                      <div className={styles.itemDetail}>
                        <Link
                          href={`./items/${encodeURIComponent(
                            item.itemId
                          )}`}
                        >
                          <h4 className={styles.itemA}>
                            {item.name}
                          </h4>
                        </Link>
                        <p>
                          フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className={styles.style}>
                            &nbsp;{item.flavor}&nbsp;
                          </span>
                        </p>
                        <p>
                          価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                          <span className={styles.style}>
                            &nbsp;{item.price}&nbsp;
                          </span>
                        </p>
                        <p>
                          数量&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className={styles.style}>
                            &nbsp;{item.countity}&nbsp;
                          </span>
                        </p>
                        <p>
                          小計 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                          <span className={styles.style}>
                            &nbsp;{item.price * item.countity}&nbsp;
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className={styles.purchased}>
          <h2
            className={styles.title_purchased}
            id="user_subscription"
          >
            継続中の定期購入
          </h2>
          {subscriptionArray.map((items: any) => {
            return (
              <div key={items.id}>
                <div>
                  <h3>購入日時：{items.date}</h3>
                  <div>
                    <div className={styles.list}>
                      <Image
                        src={items.imageUrl}
                        width={260}
                        height={260}
                        alt="商品画像"
                        className={styles.img}
                      />
                      <div className={styles.itemDetail}>
                        <Link
                          href={`./items/${encodeURIComponent(
                            items.itemId
                          )}`}
                        >
                          <h4>{items.name}</h4>
                        </Link>
                        <p>
                          フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className={styles.style}>
                            &nbsp;{items.flavor}&nbsp;
                          </span>
                        </p>
                        <p>
                          価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                          <span className={styles.style}>
                            &nbsp;{items.price}&nbsp;
                          </span>
                        </p>
                        <p>
                          定期購入 &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className={styles.style}>
                            &nbsp; 継続中 &nbsp;
                          </span>
                        </p>
                        <p>
                          <button className={styles.button} onClick={() => handler(items)}>定期購入を終了する</button>
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className={styles.purchased}>
          <h2
            className={styles.title_purchased}
            id="user_subscriptionHistories"
          >
            定期購入の履歴
          </h2>
          {subscriptionHistoriesArray.map((items: any) => {
            return (
              <div key={items.id}>
                <div>
                  <h3>終了日時：{items.date}</h3>
                  <div>
                    <div className={styles.list}>
                      <Image
                        src={items.imageUrl}
                        width={260}
                        height={260}
                        alt="商品画像"
                        className={styles.img}
                      />
                      <div className={styles.itemDetail}>
                        <Link
                          href={`./items/${encodeURIComponent(
                            items.itemId
                          )}`}
                        >
                          <h4>{items.name}</h4>
                        </Link>
                        <p>
                          フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className={styles.style}>
                            &nbsp;{items.flavor}&nbsp;
                          </span>
                        </p>
                        <p>
                          価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                          <span className={styles.style}>
                            &nbsp;{items.price}&nbsp;
                          </span>
                        </p>
                        <p>
                          定期購入 &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className={styles.style}>
                            &nbsp; 終了 &nbsp;
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <footer className={styles.footer}>
        <h1>RAKUTEIN</h1>
      </footer>
    </>
  );
};

export default UserDetails;

// input ---- readOnly={編集フラグ}/>↑trueで編集可能にする
//最初state:編集フラグ（false）
// 編集ボタン　onClickで編集フラグを切り替え
// readonlyの切り替えはフラグで
