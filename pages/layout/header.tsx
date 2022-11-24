import style from './header.module.css';

export default function Header() {
    return (
        <div className={style.body}>
            <div className={style.all}>
                <header className={style.header}>
                    <div>
                        <h1>Logo</h1>
                    </div>
                    <div className={style.headerList}>
                        <ul className={style.ul}>
                            <li className={style.li}>HOME</li>
                            <li className={style.li}>Cart</li>
                            <li className={style.li}>About User</li>
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
