export default {

    name: "Cocktail",

    sort(arr, metrics) {

        let start = 0;
        let end = arr.length - 1;
        let swapped = true;

        while (swapped) {

            swapped = false;

            for (
                let i = start;
                i < end;
                i++
            ) {

                if (
                    metrics.compare(
                        arr[i],
                        arr[i + 1]
                    ) > 0
                ) {

                    metrics.swap(arr, i, i + 1);

                    swapped = true;
                }
            }

            if (!swapped)
                break;

            swapped = false;
            end--;

            for (
                let i = end;
                i > start;
                i--
            ) {

                if (
                    metrics.compare(
                        arr[i - 1],
                        arr[i]
                    ) > 0
                ) {

                    metrics.swap(
                        arr,
                        i - 1,
                        i
                    );

                    swapped = true;
                }
            }

            start++;
        }
    }
};