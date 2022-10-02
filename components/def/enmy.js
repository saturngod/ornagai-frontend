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
                            <div className="pic">
                                {
                                    val.picture != null &&
                                    <img className="img-example" src={"/images/" + val.picture} />
                                }

                            </div>
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