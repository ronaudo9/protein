import { NextApiHandler } from 'next';
import { useEffect } from 'react';

const handler: NextApiHandler = async (req: any, res: any) => {
  const path = req.body;
  //   .substr(開始位置、文字数)※文字数は省略可能で末尾まで選択される。「/apiの4文字不要」
  const rePath = path.substr(4);
  const dataRes = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items`
  );
  const body = await dataRes.json();
  res.status(200).json(body);

  useEffect(() => {
    if (rePath) {
      const handler = async () => {
        //カテゴリ選択・フレーバー選択された時に表示
        const dataRes = await fetch(
          `${process.env.NEXT_PUBLIC_PROTEIN_DATA}${rePath}`
        );
        const body = await dataRes.json();
        res.status(200).json(body);
      };
      handler();
    }
  }, [rePath, res]);
};

export default handler;
