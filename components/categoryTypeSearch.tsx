import useSWR from 'swr';
import styles from 'styles/items_index.module.css';
import { useState, useEffect } from 'react';
import { setTokenSourceMapRange } from 'typescript';

const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

export default function CategoryTypeSearch() {
  const { data, error } = useSWR('/api/items', fetcher);
  if (error) return <div>Failed to Load</div>;
  if (!data) return <div>Loading...</div>;

  //   useEffect(() => {
  //     fetch(`/api/items/`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data, setId(data.item.category));
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, [data]);
  function SearchTextField() {
    const [category, setCategory] = useState('');
    // itemsのlistを表示・非表示を切り替え、onClickでtrueを渡して表示させる
    const [filterItems, setFilterItems] = useState(items);
    useEffect(() => {});
  }

  // useEffectで検索をクリックしたらAPIにデータを送信する
  // useStateで取得データを表示する

  return (
    <div className={styles.category1}>
      <p>種類</p>
      <select className={styles.select}>
        <option value="catogory">選択してください</option>
        <option onClick={}>ホエイプロテイン</option>
        <option onClick={}>カゼインプロテイン</option>
      </select>
    </div>
  );
}
