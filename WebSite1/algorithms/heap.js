export default {

    name: "Heap",

    sort(arr, metrics) {

        const n = arr.length;

        for (
            let i = Math.floor(n / 2) - 1;
            i >= 0;
            i--
        ) {
            heapify(
                arr,
                n,
                i,
                metrics
            );
        }

        for (
            let i = n - 1;
            i > 0;
            i--
        ) {

            metrics.swap(
                arr,
                0,
                i
            );

            heapify(
                arr,
                i,
                0,
                metrics
            );
        }
    }
};

function heapify(
    arr,
    n,
    i,
    metrics
) {

    let largest = i;

    const left =
        2 * i + 1;

    const right =
        2 * i + 2;

    if (
        left < n &&
        metrics.compare(
            arr[left],
            arr[largest]
        ) > 0
    ) {
        largest = left;
    }

    if (
        right < n &&
        metrics.compare(
            arr[right],
            arr[largest]
        ) > 0
    ) {
        largest = right;
    }

    if (largest !== i) {

        metrics.swap(
            arr,
            i,
            largest
        );

        heapify(
            arr,
            n,
            largest,
            metrics
        );
    }
}