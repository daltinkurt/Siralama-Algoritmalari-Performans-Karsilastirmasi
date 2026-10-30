export default {

    name: "InPlaceMerge",

    sort(arr, metrics) {

        mergeSort(
            arr,
            0,
            arr.length - 1,
            metrics
        );
    }
};

function mergeSort(
    arr,
    left,
    right,
    metrics
) {

    if (left >= right)
        return;

    const mid =
        Math.floor(
            (left + right) / 2
        );

    mergeSort(
        arr,
        left,
        mid,
        metrics
    );

    mergeSort(
        arr,
        mid + 1,
        right,
        metrics
    );

    merge(
        arr,
        left,
        mid,
        right,
        metrics
    );
}

function merge(
    arr,
    left,
    mid,
    right,
    metrics
) {

    let start2 =
        mid + 1;

    if (
        metrics.compare(
            arr[mid],
            arr[start2]
        ) <= 0
    ) {
        return;
    }

    while (
        left <= mid &&
        start2 <= right
    ) {

        if (
            metrics.compare(
                arr[left],
                arr[start2]
            ) <= 0
        ) {

            left++;
        }
        else {

            let value =
                arr[start2];

            let index =
                start2;

            while (
                index > left
            ) {

                arr[index] =
                    arr[index - 1];

                metrics.assign();

                index--;
            }

            arr[left] =
                value;

            metrics.assign();

            left++;
            mid++;
            start2++;
        }
    }
}