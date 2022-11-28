import useSWR from 'swr';
import styles from 'styles/items_index.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { setTokenSourceMapRange } from 'typescript';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function CategoryTypeSearch({
  category,
  categoryHandler,
}: {
  category: any;
  categoryHandler: any;
}) {
  //   onselectコールバック関数
  //     fetch(`/api/items/?category=whey`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setItems(data)
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //

  // useEffectで検索をクリックしたらAPIにデータを送信する
  // useStateで取得データを表示する,ここで行うuseState('/api/items'）,onSelect={(e)=>setCategory(e.target.value))
  //   catogoryのStateがこのコンポーネント（一番上）
  // resorce（一番下）のstateがSWR行ってdataだして、商品一覧を表示させるコンポーネントに渡すitems={data}

  return (
    <div className={styles.category1}>
      <p>種類</p>
      <select
        className={styles.select}
        onChange={categoryHandler}
        value={category}
      >
        {/* {(e) => setCategory(e.target.value)} */}
        <option value="catogory">選択してください</option>
        <option value="whey">ホエイプロテイン</option>
        <option value="casein">カゼインプロテイン</option>
      </select>
      {/* stateをvalue */}
    </div>
  );
}
