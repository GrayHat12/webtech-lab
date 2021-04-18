function sort(arr) {
    function min(arr) {
        let _min = arr[0];
        let _ind = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < _min) {
                _min = arr[i];
                _ind = i;
            }
        }
        return [_ind, _min];
    }
    let sorted = [];
    while (arr.length > 0) {
        let [_ind, _min] = min(arr);
        sorted.push(_min);
        arr.splice(_ind, 1);
    }
    return sorted;
}