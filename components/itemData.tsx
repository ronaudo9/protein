import { userAgent } from 'next/server';
import useSWR from 'swr';
import styles from '../styles/purchase.module.css';
import Link from 'next/link';
import Image from 'next/image';

const fetcher = (resource :any, init:any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemData() {
  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <div>Failed to Load</div>;
  if (!data) return <div>Loading...</div>;

  // const { dataUser, errorUser } = useSWR('/api/users', fetcher);
  // if (errorUser) return <div>userFailed to Load</div>;
  // if (!dataUser) return <div>userLoading...</div>;
  return (
    <>
      <section className={styles.itemdata_main}>
        <main className="purchase_main">
          <h1 className={styles.title}>ご注文内容確認画面</h1>
        </main>
        <div>
          <h2 className={styles.purchase_h2}>配送先住所</h2>

          <p>
            お名前：
            {/*クッキーで持ってきたuserのidと同じ情報表示user.name*/}
          </p>
          <p>
            電話番号：
            {/*クッキーで持ってきたuserのidと同じ情報表示user.telephone*/}
          </p>
          <p>
            郵便番号：
            {/*クッキーで持ってきたuserのidと同じ情報表示user.address_number */}
          </p>
          <p>
            住所：
            {/*クッキーで持ってきたuserのidと同じ情報表示user.address */}
          </p>
        </div>
        <div>
          <h2 className={styles.purchase_h2}>決済方法</h2>
          <form>
            <p>
              <input
                type="radio"
                name="pay_credit"
                value="クレジットカード"
                id="pay_credit"
                checked
              />
              <label htmlFor="pay_credit">クレジットカード</label>
            </p>
            <p>
              <input
                type="radio"
                name="cash_delivery"
                value="代引き"
                id="cash_delivery"
              />
              <label htmlFor="cash_delivery">代引き</label>
            </p>
          </form>
        </div>
        <div>
          <h2 className={styles.purchase_h2}>ご注文内容</h2>
          <section className={styles.purchase_display}>
            <Image
              src="/public/whey.webp"
              width={64}
              height={64}
              alt="商品画像"
            />
            <div className={styles.itemDetail}>
              <h4 className={styles.index_text}>商品名</h4>

              <p>
                フレーバー &nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.style}>
                  &nbsp;チョコ&nbsp;
                </span>
              </p>

              <p>
                数量 &nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.style}>&nbsp;2&nbsp;</span>
              </p>
              <p>
                合計金額 &nbsp;&nbsp;&nbsp;&nbsp; ¥
                <span className={styles.style}>
                  &nbsp;1,290&nbsp;
                </span>
              </p>
            </div>
          </section>
        </div>
        <br />
        <br />
        <br />

        <section className={styles.button_display}>
          <Link href="">
            <button className={styles.btnA}>
              <span>キャンセル</span>
            </button>
          </Link>
          <Link href="./purchased">
            <button className={styles.btnB}>
              <span>ご注文を確定する</span>
            </button>
          </Link>
        </section>
      </section>
    </>
  );
}
