import style from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderLogin() {
  return (
    <div className={style.all}>
      <div className={style.logo}>
        <Link href="/">
          <Image
            priority
            src="/images/rakutein.jpg"
            width={170}
            height={80}
            alt="logout"
          />
        </Link>
      </div>
    </div>
  );
}
