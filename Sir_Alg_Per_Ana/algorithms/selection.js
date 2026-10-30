export default {

    name: "Selection",

    sort(arr, metrics) {

        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {

            let min = i;

            for (let j = i + 1; j < n; j++) {

                if (
                    metrics.compare(
                        arr[j],
                        arr[min]
                    ) < 0
                ) {
                    min = j;
                }
            }

            if (min !== i)
                metrics.swap(arr, i, min);
        }
    }
};