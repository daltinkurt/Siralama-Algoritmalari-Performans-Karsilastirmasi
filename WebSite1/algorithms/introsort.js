import HeapSort from "./heap.js";

export default {

    name: "IntroSort",

    sort(arr, metrics) {

        if (arr.length <= 1)
            return;

        const depthLimit =
            2 *
            Math.floor(
                Math.log2(arr.length)
            );

        const stack = [];

        stack.push({
            low: 0,
            high: arr.length - 1,
            depth: depthLimit
        });

        while (stack.length > 0) {

            const {
                low,
                high,
                depth
            } = stack.pop();

            if (low >= high)
                continue;

            const size =
                high - low + 1;

            if (size <= 16) {

                insertionSort(
                    arr,
                    low,
                    high,
                    metrics
                );

                continue;
            }

            if (depth <= 0) {

                heapSortRange(
                    arr,
                    low,
                    high,
                    metrics
                );

                continue;
            }

            const pivotIndex =
                partition(
                    arr,
                    low,
                    high,
                    metrics
                );

            stack.push({
                low,
                high:
                    pivotIndex - 1,
                depth:
                    depth - 1
            });

            stack.push({
                low:
                    pivotIndex + 1,
                high,
                depth:
                    depth - 1
            });
        }
    }
};

function partition(
    arr,
    low,
    high,
    metrics
) {

    const randomIndex =
        low +
        Math.floor(
            Math.random() *
            (high - low + 1)
        );

    metrics.swap(
        arr,
        randomIndex,
        high
    );

    const pivot =
        arr[high];

    let i = low;

    for (
        let j = low;
        j < high;
        j++
    ) {

        if (
            metrics.compare(
                arr[j],
                pivot
            ) < 0
        ) {

            metrics.swap(
                arr,
                i,
                j
            );

            i++;
        }
    }

    metrics.swap(
        arr,
        i,
        high
    );

    return i;
}

function insertionSort(
    arr,
    low,
    high,
    metrics
) {

    for (
        let i = low + 1;
        i <= high;
        i++
    ) {

        const value =
            arr[i];

        let j = i - 1;

        while (
            j >= low &&
            metrics.compare(
                arr[j],
                value
            ) > 0
        ) {

            arr[j + 1] =
                arr[j];

            metrics.assign();

            j--;
        }

        arr[j + 1] =
            value;

        metrics.assign();
    }
}

function heapSortRange(
    arr,
    low,
    high,
    metrics
) {

    const temp =
        arr.slice(
            low,
            high + 1
        );

    HeapSort.sort(
        temp,
        metrics
    );

    for (
        let i = 0;
        i < temp.length;
        i++
    ) {

        arr[low + i] =
            temp[i];

        metrics.assign();
    }
}