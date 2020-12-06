let prodTools = {};

//let prods = {}; //未来从localstorage中获取

let store = window.localStorage; //声明一个对象
let prods = JSON.parse(store.getItem('prods') || '{}');

//增加或追加
prodTools.addOrUpdata = function(p) {
    //判断是否存在

    if (prods[p.id]) {
        prods[p.id] += p.number;
    } else {
        prods[p.id] = p.number;
    }
    //保存
    this.saveProds(prods);
}

//删除
prodTools.delete = function(id) {
    delete prods[id];
    this.saveProds(prods);


}

//获取
prodTools.getProds = function() {
    //获取到localstorge
    return JSON.parse(store.getItem('prods') || '{}');
}

//获取总数
prodTools.getTotalCount = function() {
    let sum = 0;
    for (let id in prods) {
        sum += prods[id];
    }
    return sum;
}

prodTools.saveProds = function(prods) {
    store.setItem('prods', JSON.stringify(prods));
}

export default prodTools;