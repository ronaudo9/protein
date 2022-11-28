import useSWR from 'swr';
import Link from 'next/link';
import styles from '../styles/items_index.module.css';
import Image from 'next/image';
import { useState } from 'react';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemDisplayNew({ data }: any) {
  // const { data, error } = useSWR('/api/items', fetcher);
  // if (error) return <div>Failed to Load</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.side}>
        {data.map((item: any) => {
          const MAX_LENGTH = 20;
          let modStr = '';
          if (item.description.length > MAX_LENGTH) {
            modStr = item.description.substr(0, MAX_LENGTH) + '...';
          }

          return (
            <div key={item.id} className={styles.items_list1}>
              <a href="./item_detail" className={styles.a}>
                <Image
                  priority
                  src={item.imageUrl}
                  alt="商品画像"
                  width={250}
                  height={250}
                />
                <li className={styles.itemA}>
                  {item.name}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span>☆</span>
                </li>
                <li className={styles.itemB}>
                  価格 &nbsp;¥{item.price.toLocaleString()}
                </li>
                <li className={styles.item}>{modStr}</li>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

// itemDisplayにpropsで持ってくるitems={data}
