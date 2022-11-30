import style from './header.module.css';
import Image from 'next/image';

export default function HeaderLogin() {
  return (
    <div className={style.all}>
      <div className={style.logo}>
        <Image
          src="/images/rakutein.jpg"
          width={170}
          height={80}
          alt="logout"
        />
      </div>
    </div>
  );
}
