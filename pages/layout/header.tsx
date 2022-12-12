import Link from 'next/link';
import style from './header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const moveToCart = () => {
      router.push('/cart');
  };

  const moveToUsers = () => {
    if (document.cookie !== '') {
      router.push('/users');
    } else {
      alert('ログインをしてください');
      router.push('/');
    }
  };

  return (
    <div className={style.all}>
      <div className={style.logo}>
        <Link href="/items">
          <Image
            priority
            src="/images/rakutein.jpg"
            width={170}
            height={80}
            alt="logout"
          />
        </Link>
      </div>
      <section className={style.iconlist}>
        <div className={style.icon} onClick={moveToCart}>
          <Image
            priority
            src="/images/cart.jpg"
            width={50}
            height={50}
            alt="cart"
          />
        </div>
        <div className={style.icon} onClick={moveToUsers}>
          <Image
            priority
            src="/images/human.jpg"
            width={45}
            height={45}
            alt="user"
          />
        </div>
        <div className={style.icon} onClick={logOut}>
          <Link href="/">
            <Image
              priority
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
