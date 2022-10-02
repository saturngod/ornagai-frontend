import MyEnRefer from "./myen_refer"

export default function MyEnText({ data }) {

    if (data == null || data == undefined) {
        data = []
    }

    return (
        <div className="myen-main">
            {
                data.map((val, index) => {
                    return (
                        <div className="myen" key={"myentext_" + index}>
                            <div>
                                <span className="state">{val.state}</span>
                                <span className="phonetics"> / {val.phonetics} / </span>
                            </div>

                            <div className="meaning">{val.meaning}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}