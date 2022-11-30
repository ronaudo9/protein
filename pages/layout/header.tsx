import Link from 'next/link';
import style from './header.module.css';
import Image from 'next/image';

const logOut = () => {
  if (document.cookie !== '') {
    var date = new Date('1999-12-31T23:59:59Z');
    document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
    alert('ログアウトしました');
  } else {
    alert('ログインをしてください');
  }
};

export default function Header() {
  return (

    <div className={style.all}>
      <div className={style.logo}>
        <Link href="/items/">
          <Image
            src="/images/rakutein.jpg"
            width={170}
            height={80}
            alt="logout"
          />
        </Link>
      </div>
      <section className={style.iconlist}>
        <div className={style.icon}>
          <Link href="/cart">
            <Image
              src="/images/cart.jpg"
              width={50}
              height={50}
              alt="cart"
            />
          </Link>
        </div>
        <div className={style.icon}>
          <Link href="/users/">
            <Image
              src="/images/human.jpg"
              width={45}
              height={45}
              alt="user"
            />
          </Link>
        </div>
        <div className={style.icon} onClick={logOut}>
          <Link href="/">
            <Image
              src="/images/logout.jpg"
              width={40}
              height={40}
              alt="logout"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
