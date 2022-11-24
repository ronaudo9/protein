import Image from 'next/image';
import Link from 'next/link';
import { NextPage } from 'next';
import styles from '../../styles/items_index.module.css';

const ItemDisplay: NextPage = () => {
  return (
    <>
      <section className={styles.title}>
        <h2>自分にあったプロテインを見つけよう</h2>
      </section>

      <section className={styles.category}>
        <div className={styles.category1}>
          <p>種類</p>
          <select className={styles.select}>
            <option value="">選択肢</option>
            <option>選択肢サンプル1</option>
            <option>選択肢サンプル2</option>
            <option>選択肢サンプル3</option>
            <option>選択肢サンプル4</option>
            <option>選択肢サンプル5</option>
            <option>選択肢サンプル6</option>
            <option>選択肢サンプル7</option>
          </select>
        </div>

        <div className={styles.category2}>
          <p>フレーバー</p>
          <select>
            <option value="">選択肢</option>
            <option>選択肢サンプル1</option>
            <option>選択肢サンプル2</option>
            <option>選択肢サンプル3</option>
            <option>選択肢サンプル4</option>
            <option>選択肢サンプル5</option>
            <option>選択肢サンプル6</option>
            <option>選択肢サンプル7</option>
          </select>
        </div>

        <div className={styles.category3}>
          <p>容量</p>
          <select>
            <option value="">選択肢</option>
            <option>選択肢サンプル1</option>
            <option>選択肢サンプル2</option>
            <option>選択肢サンプル3</option>
            <option>選択肢サンプル4</option>
            <option>選択肢サンプル5</option>
            <option>選択肢サンプル6</option>
            <option>選択肢サンプル7</option>
          </select>
        </div>
      </section>

      <section>
        <ul className={styles.items_list1}>
          <li className={styles.item}>
            <a href="#">
              <Image
                priority
                src={'/public/ダミー.jpg'}
                alt="商品画像"
                width={60}
                height={60}
              />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="#">
              <Image src={''} alt="商品画像" />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="#">
              <Image src={''} alt="商品画像" />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="#">
              <Image src={''} alt="商品画像" />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
        </ul>

        <ul className={styles.items_list2}>
          <li className={styles.item}>
            <a href="#">
              <Image src={''} alt="商品画像" />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="#">
              <Image src={''} alt="商品画像" />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="#">
              <Image src={''} alt="商品画像" />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
          <li className={styles.item}>
            <a href="#">
              <Image src={''} alt="商品画像" />
              <p>商品名<span>☆</span></p>
              <p className="price">価格</p>
              <p>説明</p>
            </a>
          </li>
        </ul>
      </section>

      <section>
        <ul className={styles.next_list}>
          <li>
            <a href="">
              <span>1</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>2</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>3</span>
            </a>
          </li>
          <li>
            <a href="">
              <span>次へ</span>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ItemDisplay;
