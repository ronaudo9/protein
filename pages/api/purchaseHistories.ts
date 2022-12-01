
export default async function handler(req:any) {
  const cookies = req.cookies;
  console.log(cookies)
  const res = await fetch(
    `http://localhost:8000/carts?id=${cookies.id}`
  );
  const carts = await res.json();
  const cart = carts[0];
  console.log(cart);
  return {
    props: { cart },
  }
};


//   await fetch(
//     `http://localhost:3000/api/users/${req.session.user.id}`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(carts),
//     }
//   ).then(() => res.redirect('/purchase/purchased/'));
