export default {
    name: "Bubble",

    sort(arr, metrics) {

        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {

            let swapped = false;

            for (let j = 0; j < n - i - 1; j++) {

                if (metrics.compare(arr[j], arr[j + 1]) > 0) {

                    metrics.swap(arr, j, j + 1);

                    swapped = true;
                }
            }

            if (!swapped)
                break;
        }
    }
};