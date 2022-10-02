export function isMyanmar(word) {
    const regex = /[\u1000-\u109F]/g
    return word.match(regex)
}

export function MyanmarSyllableList(data)  {

    var res = []

    for(var i=0; i< data.length; i++) {
        var refer = []
        var val = data[i]
        console.log(val.refer)
        if(val.refer != null) {
            refer = val.refer.split(",")
            res = res.concat(refer)
        }
    }

    return res

        
}

export default isMyanmar