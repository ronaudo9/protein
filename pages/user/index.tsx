import Head from 'next/head';
import styles from '../../styles/detail_user.module.css';
// import AnchorLink from 'react-anchor-link-smooth-scroll';
import Image from 'next/image';
import Link from 'next/link';

export default function UserDetails() {
  return (
    <>
      <Head>
        <title>ユーザー情報</title>
      </Head>
      <h1 className={styles.title}>ユーザー情報</h1>
      <div className={styles.main}>
        <div className={styles.indent}>
          <h3>目次</h3>
          <p className={styles.index_text}>
            <Link href="#user_element">基本情報</Link>
          </p>
          <p className={styles.index_text}>
            <Link href="#favorite_list">
              お気に入りリスト
            </Link>
          </p>
          <p className={styles.index_text}>
            <Link href="#user_purchased">ご購入履歴</Link>
          </p>
        </div>

        <div className={styles.element}>
          <h2 className={styles.title_element} id="user_element">
            基本情報
          </h2>
          <p className={styles.element_p}>
            <p>
              <div className={styles.element_p1}>
                ID(Email) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <span className={styles.style}>
                rakusrakusu@rakus-partners.co.jp
              </span>
            </p>

            <p>
              <div className={styles.element_p1}>
                お名前 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <span className={styles.style}>
                &nbsp;楽々楽子&nbsp;
              </span>
              &nbsp;&nbsp;&nbsp;ミドルネーム　&nbsp;
              <span className={styles.style}>&nbsp;ミドル&nbsp;</span>
            </p>
            <p>
              <div className={styles.element_p1}>
                ふりがな &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <span className={styles.style}>
                &nbsp;みょうじなまえ&nbsp;
              </span>
              &nbsp;&nbsp;&nbsp;
              <span className={styles.style}>
                &nbsp;みどるねーむ&nbsp;
              </span>
            </p>
            <p>
              <div className={styles.element_p1}>
                住所 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <ul>
                <li className={styles.li}>
                  {' '}
                  郵便番号 &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className={styles.style}>
                    &nbsp;664-0095&nbsp;
                  </span>
                </li>
                <li className={styles.li}>
                  住所 &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className={styles.style}>
                    &nbsp;東京都ほげほげ&nbsp;
                  </span>
                </li>
              </ul>
            </p>
            <p>
              <div className={styles.element_p1}>
                電話番号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <span className={styles.style}>
                &nbsp;090-1234-5678&nbsp;
              </span>
            </p>
          </p>
        </div>

        <div className={styles.favorite}>
          <h2 className={styles.title_favorite} id="favorite_list">
            お気に入りリスト
          </h2>
          <Image
            src="/public/whey.webp"
            width={64}
            height={64}
            alt="商品画像"
          />
          <div className={styles.itemDetail}>
            <Link href="">
              <h4 className={styles.index_text}>商品名</h4>
            </Link>
            <p>
              フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
              <span className={styles.style}>&nbsp;チョコ&nbsp;</span>
            </p>
            <p>
              価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
              <span className={styles.style}>&nbsp;1,290&nbsp;</span>
            </p>
          </div>
        </div>

        <div className={styles.purchased}>
          <h2 className={styles.title_purchased} id="user_purchased">
            ご購入履歴
          </h2>
          <h3>2022/11/21（購入日時を表示する）</h3>
          <div>
            <Image src={''} width={64} height={64} alt="商品画像" />
            <div className={styles.itemDetail}>
              <Link href="">
                <h4 className={styles.index_text}>商品名</h4>
              </Link>
              <p>
                フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.style}>
                  &nbsp;チョコ&nbsp;
                </span>
              </p>
              <p>
                価格 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                <span className={styles.style}>
                  &nbsp;1,290&nbsp;
                </span>
              </p>
              <p>
                数量&nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.style}>&nbsp; 1 &nbsp;</span>
              </p>
              <p>
                定期購入 &nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.style}>
                  &nbsp; あり &nbsp;
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
