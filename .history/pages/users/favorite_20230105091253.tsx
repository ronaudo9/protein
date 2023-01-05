import Image from 'next/image';
import styles from '../../styles/detail_user.module.css';
import Link from 'next/link';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { Favorite, Item } from '../../types/type';
import { supabase } from "../../utils/supabase";


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies;
  let { data }: any = await supabase
    .from('favorites')
    .select('*')
    .eq('userId', cookies.id);
  // let favs;
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/favorites?userId=${cookies.id}`
  // );
  // favs = await res.json();

  let favs = data;
  let itemsArray = favs.map((fav: any) => {
    // return `id=${fav.itemIdFav}`;
    return fav.id;
  });

  console.log(`itemsArray:${itemsArray}`)
  console.log(typeof itemsArray)


  // console.log(favs);
  // const Array = itemsArray.join('&');
  // console.log(Array);

  async function makeArray() {
    const result = await Promise.all(
      itemsArray.map(async (array: any) => {
        let { data }: any = await supabase
          .from("items")
          .select()
          .eq("id", array)
        // const y = await getY(x);
        return data;
      })
    );
    console.log(result);
  }

  // async function foo() {
  //   const array = [1, 2, 3];
  //   const result = await Promise.all(
  //     array.map(async x => {
  //       const y = await getY(x);
  //       return x * y;
  //     })
  //   );
  //   console.log(result);
  // }

  // itemsArray = await Promise.all(itemsArray.map(async (array: any) => {
  //   let { data }: any = await supabase
  //     .from("items")
  //     .select()
  //     .eq("id", array)
  //   console.log(`中身:${data[0]}`)
  // }))

  // const data = await fetch(
  //   `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items?${Array}`
  // );
  // console.log(data);

  // const itemsArray2 = data;
  //空の配列を作るために存在しないid=0を指定した。
  const data2 = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items?id=0`
  );

  const itemsArray3 = await data2.json();

  let itemsArray4 = '';
  if (itemsArray) {
    itemsArray4 = itemsArray;
  } else {
    itemsArray4 = itemsArray3;
  }

  return {
    props: { itemsArray4, favs },
  };
};

export default function FavoriteList({ itemsArray4 }: Favorite) {
  const router = useRouter();
  // お気に入り情報の削除
  function deleteItem(favoriteItem: Favorite) {
    fetch(
      `${process.env.NEXT_PUBLIC_PROTEIN}/api/favorites/${favoriteItem.id}`,
      {
        method: 'DELETE',
      }
    );
    router.reload();
  }

  return (
    <>
      <Header />

      <div className={styles.main}>
        <section className={styles.element}>
          <h2 className={styles.title_favorite} id="user_favorites">
            お気に入りリスト
          </h2>

          {itemsArray4.map((favoriteItem: any) => {
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

                      <div>
                        価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                        <span className={styles.style}>
                          &nbsp;{favoriteItem.price}
                          &nbsp;
                        </span>
                      </div>
                      <div className={styles.rightSide}>
                        <button
                          className={styles.delete_button}
                          onClick={() => deleteItem(favoriteItem)}
                        >
                          <a>削除</a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <hr />
                </div>
              </div>
            );
          })}
        </section>
        <Link href="/items">←HOMEへ戻る</Link>
      </div>
      <Footer />
    </>
  );
}
