import Image from 'next/image';


export default function ImageDisplay({userDB}:any) {
    return (
        <div>
            <Image
                priority
                src="/images/protein_display.png"
                alt="protein_display"
                width={300}
                height={150}
            />
            <p>
                ちょっとした診断から{userDB.lastName}さんにぴったりのプロテインを見つけてみましょう。
            </p>
        </div>
    );
}
