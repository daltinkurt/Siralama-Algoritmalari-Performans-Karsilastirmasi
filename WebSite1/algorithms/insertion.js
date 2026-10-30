export default {
    name: "Insertion",

    sort(arr, metrics) {

        for (let i = 1; i < arr.length; i++) {

            let key = arr[i];
            let j = i - 1;

            while (
                j >= 0 &&
                metrics.compare(arr[j], key) > 0
            ) {
                arr[j + 1] = arr[j];
                metrics.assign();
                j--;
            }

            arr[j + 1] = key;
            metrics.assign();
        }
    }
};