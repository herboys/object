
/**
 * 点击从数组里删除当前元素
 * father：接受的是数组
 * child：接受的是选择的键值
 * road： 接受的是当前选择的键值
 * **/
export function DeleteListItem(father,child,road){
    for (let i = 0; i <father.length ; i++) {
        if(father[i][road]===child){
            father.splice(i,1);
        }
    }
    return father
}