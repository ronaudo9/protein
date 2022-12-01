import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from '../../styles/detail_user.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../layout/header';

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.cookies;
  console.log(cookies.id);
  const res = await fetch(
    `http://localhost:8000/users?id=${cookies.id}`
  );
  const users = await res.json();
  const user = users[0];
  return {
    props: { user },
  };
};

const UserDetails = ({ user }: any) => {
  function asteriskPass() {
    let asterisk = '';
    for (let i = 0; i <= user.password.length; i++) {
      asterisk += '*';
    }
    console.log(asterisk);
  }
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

          <div className={styles.font}>
            <div className={styles.elementCategory}>
              <div>
                <span className={styles.element_p1}>
                  ID(Email) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className={styles.style}>{user.email}</span>

                <Link href="/users/emailEdit" legacyBehavior>
                  <button type="submit" className={styles.btnA}>
                    編集
                  </button>
                </Link>
              </div>
            </div>

            <div className={styles.elementCategory}>
              <div>
                <div>
                  <span className={styles.element_p1}>
                    お名前 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className={styles.style}>
                    &nbsp;{user.firstName}&nbsp;{user.lastName}&nbsp;
                  </span>
                </div>
                <div>
                  <span className={styles.element_p1}>
                    ふりがな &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className={styles.style}>
                    &nbsp;{user.firstNameKana}&nbsp;
                    {user.lastNameKana}
                    &nbsp;
                  </span>
                  <Link href="/users/nameEdit" legacyBehavior>
                    <button type="submit" className={styles.btnA}>
                      編集
                    </button>
                  </Link>
                </div>

                <div>
                  &nbsp;&nbsp;&nbsp;ミドルネーム　&nbsp;
                  <span className={styles.style}>
                    &nbsp;{user.middleName}&nbsp;
                  </span>
                  <Link href="/users/middleNameEdit" legacyBehavior>
                    <button type="submit" className={styles.btnA}>
                      編集
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.elementCategory}>
              <div></div>
            </div>

            <div className={styles.elementCategory}>
              <div>
                <span className={styles.element_p1}>
                  住所 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <ul>
                  <li className={styles.li}>
                    {' '}
                    郵便番号 &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.style}>
                      &nbsp;{user.postCode}&nbsp;
                    </span>
                  </li>
                  <li className={styles.li}>
                    住所 &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.style}>
                      &nbsp;{user.prefecture}
                      {user.city}
                      {user.aza}
                      {user.building}&nbsp;
                    </span>
                  </li>
                  <Link href="/users/postCodeEdit" legacyBehavior>
                    <button type="submit" className={styles.btnA}>
                      編集
                    </button>
                  </Link>
                </ul>
              </div>
            </div>

            <div className={styles.elementCategory}>
              <div>
                <span className={styles.element_p1}>
                  電話番号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className={styles.style}>
                  &nbsp;{user.tel}&nbsp;
                </span>
              </div>
              <Link href="/users/telEdit" legacyBehavior>
                <button type="submit" className={styles.btnA}>
                  編集
                </button>
              </Link>
            </div>

            <div className={styles.elementCategory}>
              <div>
                <span className={styles.element_p1}>
                  パスワード &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span>&nbsp;{asteriskPass}&nbsp;</span>
              </div>
              <div>
                <Link href="/users/passwordEdit" legacyBehavior>
                  <button type="submit" className={styles.btnA}>
                    編集
                  </button>
                </Link>
              </div>
            </div>

            <Link href="/users/new" legacyBehavior>
              <p className={styles.credit}>
                <button type="submit" className={styles.btnB}>
                  クレジットカード情報変更はこちら &rarr;
                </button>
              </p>
            </Link>
          </div>
        </section>
        <section className={styles.favorite}>
          <h2 className={styles.title_favorite} id="favorite_list">
            お気に入りリスト
          </h2>
          <div>
            <div className={styles.list}>
              <Image
                src=""
                width={64}
                height={64}
                alt="商品画像"
                className={styles.img}
              />
              <div className={styles.itemDetail}>
                <Link href="">
                  <h4>商品名</h4>
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
              </div>
            </div>
            <hr />
          </div>
        </section>

        <section className={styles.purchased}>
          <h2 className={styles.title_purchased} id="user_purchased">
            ご購入履歴
          </h2>
          <div>
            <h3>2022/11/21（購入日時を表示する）</h3>
            <div>
              <div className={styles.list}>
                <Image
                  src=""
                  width={64}
                  height={64}
                  alt="商品画像"
                  className={styles.img}
                />
                <div className={styles.itemDetail}>
                  <Link href="">
                    <h4>商品名</h4>
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
                    <span className={styles.style}>
                      &nbsp; 1 &nbsp;
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

          <div>
            <div className={styles.list}>
              <Image
                src=""
                width={64}
                height={64}
                alt="商品画像"
                className={styles.img}
              />
              <div className={styles.itemDetail}>
                <Link href="">
                  <h4>商品名</h4>
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
                  <span className={styles.style}>
                    &nbsp; 1 &nbsp;
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
