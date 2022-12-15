export default async function handler(req: any, res: any) {
  const email = req.body['email'];
  const password = req.body['password'];

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/users?email=${email}&password=${password}`
  );
  const data = await response.json();
  const user = data[0];
  res.setHeader('Set-Cookie', [
    `id=${user.id}; max-age=86400; path=/`,
    // max-age保持させる期限
  ]);
  res.status(200).json(user);
}
