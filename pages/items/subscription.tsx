import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const cookies = context.req.cookies;
  console.log(`cookie:${cookies.id}`);
  const res = await fetch(
    `http://localhost:8000/subscriptionCart?userId=${cookies.id}`
  );
  const subscriptionCart = await res.json();
  subscriptionCart.forEach((cart: any) => {
    cart.date = new Date().toLocaleString('ja-JP');
  });
  const subscription = {
    userId: cookies.id,
    items: subscriptionCart,
  };
  // const subscription = {
  //   userId: cookies.id,
  //   items: subscriptionCart,
  // };
  // await fetch(`http://localhost:8000/subscription`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(subscription),
  // }).then(() => {
  //   subscriptionCart.forEach((cart: any) => {
  //     fetch(`http://localhost:8000/carts/${cart.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(subscription),
  //     });
  //   });
  // });
  return {
    props: {subscriptionCart,subscription},
  };
};


export default function PurchaseCompletion({subscriptionCart,subscription}:any) {
 const router = useRouter();
const handler = (event: any) => {

  event.preventDefault();
  fetch('http://localhost:8000/subscription', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(subscription),
  }).then(() => {
    deleteCarts(event);
    router.push('/purchase/purchased/');
  });
}

const data = {};

const deleteCarts = (event: any) => {
  event.preventDefault();
  subscriptionCart.forEach((cart: any) => {
    fetch(`http://localhost:8000/subscriptionCart/${cart.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
};

  return (
    <>
    定期購入を開始しますか？
    <button onClick={handler}>開始</button>
    &nbsp; <Link href={`javascript:history.back()`}>
      <button>前のページに戻る</button>
      </Link>
    </>
  )
}
