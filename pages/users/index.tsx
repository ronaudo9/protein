import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from '../../styles/detail_user.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../layout/header';
import useSWR from 'swr';
import EmailEdit from '../../components/emailEdit';
import UsersElements from '../../components/usersElements';

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
    console.log(items);

    items.forEach((item: any) => {
      itemsArray.push(item);
    });
  });

  return {
    props: { user, itemsArray },
  };
};

const UserDetails = ({ user, itemsArray }: any) => {
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
              <Link href="#favorite_list">お気に入りリスト</Link>
            </p>
            <p className={styles.index_text}>
              <Link href="#user_purchased">ご購入履歴</Link>
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
                  <h3>{item.date}</h3>
                  <div>
                    <div className={styles.list}>
                      <Image
                        src={item.imageUrl}
                        width={64}
                        height={64}
                        alt="商品画像"
                        className={styles.img}
                      />
                      <div className={styles.itemDetail}>
                        <Link
                          href={`./items/${encodeURIComponent(
                            item.itemId
                          )}`}
                        >
                          <h4>{item.name}</h4>
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
                        <p>
                          定期購入 &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className={styles.style}>
                            &nbsp; あり &nbsp;
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
    </>
  );
};

export default UserDetails;

// input ---- readOnly={編集フラグ}/>↑trueで編集可能にする
//最初state:編集フラグ（false）
// 編集ボタン　onClickで編集フラグを切り替え
// readonlyの切り替えはフラグで
