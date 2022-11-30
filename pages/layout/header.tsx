import Link from 'next/link';
import style from './header.module.css';
import Image from 'next/image';
import { maxHeaderSize } from 'http';

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
            width={200}
            height={100}
            alt="logout"
          />
        </Link>
      </div>
      <div className={style.iconlist}>
        <div className={style.icon}>
          <Link href="/cart">
            <Image
              src="/images/cart.jpg"
              width={55}
              height={55}
              alt="cart"
            />
          </Link>
        </div>
        <div className={style.icon}>
          <Link href="/users/">
            <Image
              src="/images/human.jpg"
              width={50}
              height={50}
              alt="user"
            />
          </Link>
        </div>
        <div className={style.icon} onClick={logOut}>
          <Link href="/">
            <Image
              src="/images/logout.jpg"
              width={49}
              height={49}
              alt="logout"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
