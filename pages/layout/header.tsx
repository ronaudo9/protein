import Link from "next/link";
import style from './header.module.css';

const logOut = () => {
    if (document.cookie !== "") {
        var date = new Date('1999-12-31T23:59:59Z');
        document.cookie = `id=;path=/;expires=${date.toUTCString()};`;
        alert('ログアウトしました');
    } else {
        alert('ログインをしてください')
    }
}

export default function Header() {
    return (
        // Header Start
        <div className={style.body}>
            <div className={style.all}>
                <header className={style.header}>
                    <div>
                        <h1>Logo</h1>
                    </div>
                    <div className={style.headerList}>
                        <ul className={style.ul}>
                            <li className={style.li}>商品一覧</li>
                            <li className={style.li}>カート</li>
                            <li className={style.li}>ユーザー情報</li>
                            <li className={style.li} onClick={logOut}>
                                <Link href="/">ログアウト</Link>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className={style.container}>
                    <main className={style.main}>
                        <h2>ここにテキストが入ります</h2>
                        <p>
                            説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
}

{/* Header End */ }

{/* <div className={style.headerLogo}>
                <Image
                    priority
                    src="/images/home_icon.png"
                    alt="ホームロゴ"
                    className={style.img}
                    height={35}
                    width={35}
                />
            </div>
            <div className={style.headerMenu}>
                <a href="#" className={style.a}>ログイン中</a>
                <a href="#" className={style.a}>
                    <Image
                        priority
                        src="/images/user_icon.png"
                        alt="ユーザーアイコン"
                        className={style.img}
                        height={35}
                        width={35}
                    />
                </a>
                <a href="#" className={style.a}>
                    <Image
                        priority
                        src="/images/cart_icon.png"
                        alt="カートアイコン"
                        className={style.img}
                        height={35}
                        width={35}
                    />
                </a>
            </div> */}
