export default {

    name: "TimSort",

    sort(arr, metrics) {

        const RUN = 32;

        for (
            let i = 0;
            i < arr.length;
            i += RUN
        ) {

            insertionSort(
                arr,
                i,
                Math.min(
                    i + RUN - 1,
                    arr.length - 1
                ),
                metrics
            );
        }

        for (
            let size = RUN;
            size < arr.length;
            size *= 2
        ) {

            for (
                let left = 0;
                left < arr.length;
                left += 2 * size
            ) {

                const mid =
                    left + size - 1;

                const right =
                    Math.min(
                        left + 2 * size - 1,
                        arr.length - 1
                    );

                if (mid < right) {

                    merge(
                        arr,
                        left,
                        mid,
                        right,
                        metrics
                    );
                }
            }
        }
    }
};

function insertionSort(
    arr,
    left,
    right,
    metrics
) {

    for (
        let i = left + 1;
        i <= right;
        i++
    ) {

        let temp = arr[i];
        let j = i - 1;

        while (
            j >= left &&
            metrics.compare(
                arr[j],
                temp
            ) > 0
        ) {

            arr[j + 1] =
                arr[j];

            metrics.assign();

            j--;
        }

        arr[j + 1] =
            temp;

        metrics.assign();
    }
}

function merge(
    arr,
    left,
    mid,
    right,
    metrics
) {

    const len1 =
        mid - left + 1;

    const len2 =
        right - mid;

    const leftArr =
        new Array(len1);

    const rightArr =
        new Array(len2);

    for (
        let i = 0;
        i < len1;
        i++
    ) {

        leftArr[i] =
            arr[left + i];

        metrics.assign();
    }

    for (
        let i = 0;
        i < len2;
        i++
    ) {

        rightArr[i] =
            arr[mid + 1 + i];

        metrics.assign();
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (
        i < len1 &&
        j < len2
    ) {

        if (
            metrics.compare(
                leftArr[i],
                rightArr[j]
            ) <= 0
        ) {

            arr[k++] =
                leftArr[i++];

            metrics.assign();
        }
        else {

            arr[k++] =
                rightArr[j++];

            metrics.assign();
        }
    }

    while (i < len1) {

        arr[k++] =
            leftArr[i++];

        metrics.assign();
    }

    while (j < len2) {

        arr[k++] =
            rightArr[j++];

        metrics.assign();
    }
}