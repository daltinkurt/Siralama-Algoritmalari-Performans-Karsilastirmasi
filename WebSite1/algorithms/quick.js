export default {

    name: "Quick",

    sort(arr, metrics) {

        quickSortIterative(
            arr,
            metrics
        );
    }
};

function quickSortIterative(
    arr,
    metrics
) {

    if (arr.length <= 1)
        return;

    const stack = [];

    stack.push({
        low: 0,
        high: arr.length - 1
    });

    while (stack.length > 0) {

        const {
            low,
            high
        } = stack.pop();

        if (low >= high)
            continue;

        const pivotIndex =
            partition(
                arr,
                low,
                high,
                metrics
            );

        if (pivotIndex - 1 > low) {

            stack.push({
                low,
                high:
                    pivotIndex - 1
            });
        }

        if (pivotIndex + 1 < high) {

            stack.push({
                low:
                    pivotIndex + 1,
                high
            });
        }
    }
}

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