import styles from '../../styles/users.edit.module.css';
import Link from 'next/link';
import Header from '../layout/header';



const UsersEdit = () => {
  return (
    <>
      <Header />
      <hr className={styles.hr}></hr>
      <div>
        <div className="container">
          <header className={styles.header}>
            <div className="row">
              <h1 className={styles.h1}>ユーザー情報編集</h1>
            </div>
          </header>
        </div>

      <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <div className={styles.formGroup}>
              <label htmlFor="name">
                <span className="label label-danger">
                  ・姓・名の編集
                </span>
              </label>
              <div>
                <Link href="/users/nameEdit" legacyBehavior>
                  <p className={styles.Current}>
                    <button type="submit">姓・名</button>
                  </p>
                </Link>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">
                <span className="label label-danger">
                  ・ミドルネームの編集
                </span>
              </label>
              <div>
                <Link href="/users/middleNameEdit" legacyBehavior>
                  <p className={styles.Current}>
                    <button type="submit">ミドルネーム</button>
                  </p>
                </Link>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">
                <span className="label label-danger">
                  ・Eメールアドレスの編集
                </span>
              </label>

              <div>
                <Link href="/users/emailEdit" legacyBehavior>
                  <p className={styles.Current}>
                    <button type="submit">Eメールアドレス</button>
                  </p>
                </Link>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">
                <span className="label label-danger">
                  ・パスワードの編集
                </span>
              </label>
              <div>
                <Link href="/users/passwordEdit" legacyBehavior>
                  <p className={styles.Current}>
                    <button type="submit">パスワード</button>
                  </p>
                </Link>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="postCode">
                <span className="label label-danger">
                  ・郵便番号・住所変更の編集
                </span>
              </label>

              <div>
                <Link href="/users/postCodeEdit" legacyBehavior>
                  <p className={styles.Current}>
                    <button type="submit">郵便番号・住所</button>
                  </p>
                </Link>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tel">
                <span className="label label-danger">・電話番号の編集</span>
              </label>
              <div>
                <Link href="/users/telEdit" legacyBehavior>
                  <p className={styles.Current}>
                    <button type="submit">電話番号</button>
                  </p>
                </Link>
              </div>
            </div>

            <div className={styles.btnPrimary}>
              <Link href="/users/new" legacyBehavior>
                <a className={styles.credit}>
                  <h2>クレジットカード情報変更はこちら &rarr;</h2>
                  <p></p>
                </a>
              </Link>
            </div>
          </div>
      </div>
    </>
  );
};
export default UsersEdit;
