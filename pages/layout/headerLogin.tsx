import style from './header.module.css';
import Image from 'next/image';

export default function HeaderLogin() {
  return (
    <div className={style.all}>
      <div className={style.logo}>
        <Image
          src="/images/rakutein.jpg"
          width={200}
          height={100}
          alt="logout"
        />
      </div>
    </div>
  );
}
