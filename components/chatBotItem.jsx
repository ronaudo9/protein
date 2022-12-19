import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/items_index.module.css';


export default function ChatBotItem({ data }) {
    return (
        <>
            <div className={styles.side}>
                {data.map((item) => {
                    const MAX_LENGTH = 55;
                    let modStr = '';
                    if (item.description.length > MAX_LENGTH) {
                        modStr = item.description.substr(0, MAX_LENGTH) + '...';
                    }

                    return (
                        <div key={item.id} className={styles.items_list1}>
                            <div className={styles.itemsImg}>
                                <Image
                                    priority
                                    src={item.imageUrl}
                                    alt="商品画像"
                                    width={260}
                                    height={260}
                                    className={styles.imgPro}
                                />
                            </div>

                            <div className={styles.ul}>
                                <Link
                                    href={`items/${encodeURIComponent(item.id)}`}
                                    className={styles.a}
                                >
                                    <p className={styles.itemA}>{item.name}</p>
                                </Link>
                                <p className={styles.itemB}>
                                    価格 &nbsp;¥{item.price.toLocaleString()}
                                </p>
                                <p className={styles.item}>{modStr}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
