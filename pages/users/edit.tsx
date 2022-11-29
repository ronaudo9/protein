import styles from '../../styles/users.edit.module.css';
import Link from 'next/link';
import Header from '../layout/header';

function UsersEdit() {
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
          <form action="#" method="get" className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  <span className="label label-danger">・お名前</span>
                  （必須）
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    placeholder="例:お名前"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  <span className="label label-danger">
                    ・ふりがな
                  </span>
                  （必須）
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    placeholder="例:ふりがな"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  <span className="label label-danger">
                    ・ミドルネーム
                  </span>
                  （任意）
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="例:ミドルネーム"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">
                  <span className="label label-danger">
                    ・Eメールアドレス
                  </span>
                  （必須）
                </label>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.inputEmail}
                    placeholder="例:raffaello@jungleocean.com"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">
                  <span className="label label-danger">
                    ・パスワード
                  </span>
                  （必須）
                </label>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    placeholder="例:半角英数でご入力ください"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">
                  <span className="label label-danger">
                    ・確認用パスワード
                  </span>
                  （必須）
                </label>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    placeholder="例:もう一度パスワードをご入力ください"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="postCode">
                  <span className="label label-danger">
                    ・郵便番号
                  </span>
                  （必須）
                </label>
                <div>
                  <input
                    type="postCode"
                    id="postCode"
                    name="postCode"
                    className={styles.input}
                    placeholder="例:〒●●●-●●●●"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">
                  <span className="label label-danger">・住所</span>
                  （必須）
                </label>
                <div>
                  <input
                    type="address"
                    id="address"
                    name="address"
                    className={styles.inputEmail}
                    placeholder="例:●●県●●市●町●番地●号"
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="tel">
                  <span className="label label-danger">
                    ・電話番号
                  </span>
                  （必須）
                </label>
                <div>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    className={styles.input}
                    placeholder="例:●●●-●●●●-●●●●"
                    required
                  />
                </div>
              </div>
              <div className={styles.btnPrimary}>
                <button type="submit">編集完了</button>
              </div>
              <div className={styles.btnPrimary}>
                <Link href="/users/new" legacyBehavior>
                  <a className={styles.card}>
                    <h2>クレジットカード情報変更はこちら &rarr;</h2>
                    <p></p>
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default UsersEdit;
