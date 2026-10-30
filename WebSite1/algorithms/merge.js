export default {

    name: "Merge",

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

    const leftPart =
        arr.slice(
            left,
            mid + 1
        );

    const rightPart =
        arr.slice(
            mid + 1,
            right + 1
        );

    let i = 0;
    let j = 0;
    let k = left;

    while (
        i < leftPart.length &&
        j < rightPart.length
    ) {

        if (
            metrics.compare(
                leftPart[i],
                rightPart[j]
            ) <= 0
        ) {

            arr[k++] =
                leftPart[i++];

            metrics.assign();
        }
        else {

            arr[k++] =
                rightPart[j++];

            metrics.assign();
        }
    }

    while (i < leftPart.length) {

        arr[k++] =
            leftPart[i++];

        metrics.assign();
    }

    while (j < rightPart.length) {

        arr[k++] =
            rightPart[j++];

        metrics.assign();
    }
}