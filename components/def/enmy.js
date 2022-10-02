export default function EnMyText({ data }) {
    if (data == null || data == undefined) {
        data = []
    }

    return (
        <div className="engmm-main">
            {
                data.map((val, index) => {
                    return (
                        <div className="engmm" key={"engmm_" + index}>
                            <div className="def">
                                <div className="engmm_data" dangerouslySetInnerHTML={{ __html: val.definition }}></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}