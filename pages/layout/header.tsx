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
                {/* <header className={style.header}>
                    <div>
                        <h1>Logo</h1>
                    </div> */}
                <div className={style.headerList}>
                    <ul className={style.ul}>
                        <li className={style.li}>
                            <Link href="/items/">商品一覧</Link>
                        </li>
                        <li className={style.li}>
                            <Link href="#">カート</Link>
                        </li>
                        <li className={style.li}>
                            <Link href="/users/">ユーザー情報</Link>
                        </li>
                        <li className={style.li} onClick={logOut}>
                            <Link href="/">ログアウト</Link>
                        </li>
                    </ul>
                </div>
                {/* </header> */}
            </div>
        </div>
    );
}
