export default {

    name: "Shell",

    sort(arr, metrics) {

        for (
            let gap =
            Math.floor(arr.length / 2);
            gap > 0;
            gap = Math.floor(gap / 2)
        ) {

            for (
                let i = gap;
                i < arr.length;
                i++
            ) {

                let temp = arr[i];
                let j = i;

                while (
                    j >= gap &&
                    metrics.compare(
                        arr[j - gap],
                        temp
                    ) > 0
                ) {

                    arr[j] = arr[j - gap];
                    metrics.assign();

                    j -= gap;
                }

                arr[j] = temp;
                metrics.assign();
            }
        }
    }
};