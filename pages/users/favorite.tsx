import Image from 'next/image';
import styles from '../../styles/detail_user.module.css';
import Link from 'next/link';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { idText } from 'typescript';

export const getServerSideProps = async ({ req }: any) => {
  const cookies = req.cookies;

  let favs;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/favorites?userId=${cookies.id}`
  );
  favs = await res.json();
  console.log(favs);

  const itemsArray = favs.map((fav: any) => {
    return `id=${fav.itemId}`;
  });
  const Array = itemsArray.join('&');
  // console.log(Array);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items?${Array}`
  );
  const itemsArray2 = await data.json();
  // console.log(itemsArray2);

  // const favsIdArray = favs.id;
  // const favsIdArray = favs.slice(-1)[0];

  const favsIdArray = favs.map((favid: any) => {
    favid.id;
  });

  const itemsArray3 = {
    id: favsIdArray,
    items: itemsArray2,
  };
  console.log(itemsArray3);

  return {
    props: { itemsArray2, favs },
  };
};

export default function FavoriteList({ itemsArray2, favs }: any) {
  const router = useRouter();
  // cartsの削除【始まり】
  function deleteItem(favoriteItem: any) {
    // .filterを使用して削除ボタンが押されたitmIdを取得し、それ以外の配列データを作る
    // favoriteItemにfilterをかけると、取れるのはその商品情報のidのみ⇒filterじゃなくてfavoriteItem.id
    // itemsArray2にfilterをかけると、取れるのは？その人が登録した各商品の商品情報のidのみ
    // itemsAeeayにfilterをかけると、取れるのは[ 'id=2', 'id=3', 'id=2', 'id=5' ]で同じユーザーodのお気に入りのitemId
    const favNew = favs.filter((item: any) => {
      return item.itemId === favoriteItem.id;
    });
    console.log(favNew);
    fetch(`${process.env.NEXT_PUBLIC_PROTEIN}/api/favorites/:id`, {
      method: 'PATCH',
    });
    router.reload();
  }
  // favorites?itemId_like=だとitemIdを持つすべてのデータを消してしまう、他の人も。
  // cartsの削除【終わり】
  return (
    <>
      <Header />

      <div className={styles.main}>
        <section className={styles.element}>
          <h2 className={styles.title_favorite} id="user_favorites">
            お気に入りリスト
          </h2>

          {itemsArray2.map((favoriteItem: any) => {
            return (
              <div key={favoriteItem.id}>
                <br />
                <div>
                  <div className={styles.list}>
                    <Image
                      priority
                      src={favoriteItem.imageUrl}
                      width={260}
                      height={260}
                      alt="商品画像"
                      className={styles.img}
                    />
                    <div className={styles.itemDetail}>
                      <Link
                        href={`../items/${encodeURIComponent(
                          favoriteItem.id
                        )}`}
                        className={styles.a}
                      >
                        <div className={styles.itemA}>
                          {favoriteItem.name}
                        </div>
                      </Link>

                      <p>
                        価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                        <span className={styles.style}>
                          &nbsp;{favoriteItem.price.toLocaleString()}
                          &nbsp;
                        </span>
                      </p>
                      <button
                        className={styles.delete_button}
                        onClick={() => deleteItem(favoriteItem)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <br />
                  <hr />
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <Footer />
    </>
  );
}
