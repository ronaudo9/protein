import Image from 'next/image';
import styles from '../../styles/detail_user.module.css';
import Link from 'next/link';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

export const getServerSideProps = async ({ req }: any) => {
  const cookies = req.cookies;

  let favs;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/favorites?userId=${cookies.id}`
  );
  favs = await res.json();

  const itemsArray = favs.map((fav: any) => {
    return `id=${fav.itemId}`;
  });
  const Array = itemsArray.join('&');

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items?${Array}`
  );
  const itemsArray2 = await data.json();

  return {
    props: { itemsArray2 },
  };
};

export default function FavoriteList({ itemsArray2 }: any) {
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
                        <h4 className={styles.itemA}>
                          {favoriteItem.name}
                        </h4>
                      </Link>

                      <p>
                        価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                        <span className={styles.style}>
                          &nbsp;{favoriteItem.price.toLocaleString()}
                          &nbsp;
                        </span>
                      </p>
                      <button type="button">削除</button>
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
