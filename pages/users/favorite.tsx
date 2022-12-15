import Image from 'next/image';
import styles from '../../styles/detail_user.module.css';
import Link from 'next/link';
import Header from '../layout/header';
import Footer from '../layout/footer';

export default function FavoriteList() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <section className={styles.element}>
          <h2 className={styles.title_favorite} id="user_favorites">
            お気に入りリスト
          </h2>

          {/* {favoritesArray[0].map((favoriteItem: any) => {
        return (
          <div key={favoriteItem.id}>
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
                    href={`./items/${encodeURIComponent(
                      favoriteItem.itemId
                    )}`}
                  >
                    <h4 className={styles.itemA}>
                      {favoriteItem.name}
                    </h4>
                  </Link>

                  <p>
                    価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                    <span className={styles.style}>
                      &nbsp;{favoriteItem.price}&nbsp;
                    </span>
                  </p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        );
      })} */}
        </section>
      </div>
      <Footer />
    </>
  );
}
