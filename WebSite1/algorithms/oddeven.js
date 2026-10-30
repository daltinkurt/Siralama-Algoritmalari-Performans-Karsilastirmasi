export default {

    name: "OddEven",

    sort(arr, metrics) {

        let sorted = false;

        while (!sorted) {

            sorted = true;

            for (
                let i = 1;
                i < arr.length - 1;
                i += 2
            ) {

                if (
                    metrics.compare(
                        arr[i],
                        arr[i + 1]
                    ) > 0
                ) {

                    metrics.swap(
                        arr,
                        i,
                        i + 1
                    );

                    sorted = false;
                }
            }

            for (
                let i = 0;
                i < arr.length - 1;
                i += 2
            ) {

                if (
                    metrics.compare(
                        arr[i],
                        arr[i + 1]
                    ) > 0
                ) {

                    metrics.swap(
                        arr,
                        i,
                        i + 1
                    );

                    sorted = false;
                }
            }
        }
    }
};