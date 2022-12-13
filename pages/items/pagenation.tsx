import {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
} from 'next';
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Link from 'next/link';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items/`
  );
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
      `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items/${params!.id}`
    );
    const detail = await res.json();
    return {
      props: { detail }
    };
};


export default function pagenation(detail: any) {

}
