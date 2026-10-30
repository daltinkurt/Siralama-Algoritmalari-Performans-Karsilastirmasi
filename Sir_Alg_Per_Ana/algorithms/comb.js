export default {

    name: "Comb",

    sort(arr, metrics) {

        let gap = arr.length;
        let swapped = true;

        while (gap > 1 || swapped) {

            gap = Math.floor(gap / 1.3);

            if (gap < 1)
                gap = 1;

            swapped = false;

            for (
                let i = 0;
                i + gap < arr.length;
                i++
            ) {

                if (
                    metrics.compare(
                        arr[i],
                        arr[i + gap]
                    ) > 0
                ) {

                    metrics.swap(
                        arr,
                        i,
                        i + gap
                    );

                    swapped = true;
                }
            }
        }
    }
};