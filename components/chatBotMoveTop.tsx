import Link from 'next/link';
import styles from '../styles/chatBotMoveTop.module.css';


export default function ChatBotMoveTop() {
    return (
        <>
            <main>
                <Link href="/items">
                    <section className={styles.section}>
                        <a className={styles.btn_09}>
                            <span className={styles.span}><span>RAKUTEIN</span>商品一覧ページ</span>
                        </a>
                    </section>
                </Link>
            </main>
        </>
    );
}
