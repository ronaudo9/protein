import useSWR from 'swr';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import React, { useState } from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:8000/items/`);
  const items = await res.json();
  const paths = items.map((item: any) => ({
    params: {
      // idをdb.jsonファイルの文字列に合わせる
      id: item.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(
    `http://localhost:8000/items/${params!.id}`
  );
  const detail = await res.json();

  return {
    props: { detail },
    revalidate: 10,
  };
};

// orderTotal関数
function OrderTotal() {
  const [total, setTotal] = React.useState(0);

  const addHandler = (sub:any) => {
    setTotal(total + sub);
  };

  return (
    <main>
      <Items addHandler={addHandler} />
      <p>合計{total}円</p>
    </main>
  );
}

// Items関数
function Items({ addHandler }:any) {

  return (
    <div className="container">
      {items.map((item) => {
        return (
          <Item
            key={item.id}
            name={item.name}
            price={item.price}
            addHandler={addHandler}
          />
        );
      })}
    </div>
  );
}

// Item関数
function Item({ name, price, addHandler }:any) {
  return (
    <div className="item">
      <dl>
        <dt>{name}</dt>
        <dd>
          {price}円
          <Counter price={price} addHandler={addHandler} />
        </dd>
      </dl>
    </div>
  );
}


// Counter関数
function Counter({ price, addHandler }:any) {
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);

  const clickHandler = () => {
    const nextCount = count + 1;
    setCount(nextCount);

    const nextTotal = price * nextCount;
    setTotal(nextTotal);

    addHandler(price);
  };

  return (
    <p>
      {count}個&nbsp;小計{total}円&nbsp;
      <button type="button" onClick={clickHandler}>
        追加
      </button>
    </p>
  );
}
