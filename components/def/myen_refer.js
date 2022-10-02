import Link from "next/link"

export default function MyEnRefer({ refer }) {
    return (
        <ul className="refer-list">
            {
                refer.map((value, index) => {
                    return (
                        <li key={"refer_myen" + index }>
                            <Link href={`/result/${value}`}>
                                {value}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}