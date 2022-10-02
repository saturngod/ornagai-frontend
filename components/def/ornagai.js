export default function OrnagaiText({ data }) {
    if (data == null || data == undefined) {
        data = []
    }
    return (
        <div className="ornagai-main">
            {
                data.map((val, index) => {
                    return (<div className="ornagai" key={"ornagai_" + index}>
                        <div className="state">{val.state}</div>
                        <div className="def">{val.def}</div>
                    </div>)
                })
            }
        </div>
    )
}