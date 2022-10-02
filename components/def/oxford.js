export default function OxfordText({ data }) {
   
    if(data == null || data == undefined) {
        data = []
    }

    return (
        <div className="oxford-main">
            {
                data.map((val,index) => {
                    
                    return (
                    <div className="oxford" key={"oxford_" + index}>
                        <div className="def">
                        <div className="engmm_data" dangerouslySetInnerHTML={{ __html: val }}></div>

                        </div>
                    </div>)
                })
            }
        </div>
    )
}