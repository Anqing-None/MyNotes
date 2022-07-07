class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

let list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

function mergeList(list1, list2) {
    if (list1 === null) {
        console.log(`list1为空，返回list2`);
        return list2;
    } else if (list2 === null) {
        console.log(`list2为空，返回list1`);
        return list1;
    } else {
        if (list1.val < list2.val) {
            console.log(`list1.val:${list1.val} < list2.val:${list2.val}`);
            list1.next = mergeList(list1.next, list2);
            return list1;
        } else {
            list2.next = mergeList(list1, list2.next);
            return list2;
        }
    }
}

let merged = mergeList(list1, list2);
