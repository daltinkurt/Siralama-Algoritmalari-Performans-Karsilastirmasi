export default {

    name: "Library",

    sort(arr, metrics) {

        const result = [];

        for (const value of arr) {

            let left = 0;
            let right = result.length;

            while (left < right) {

                const mid =
                    Math.floor(
                        (left + right) / 2
                    );

                if (
                    metrics.compare(
                        value,
                        result[mid]
                    ) < 0
                ) {

                    right = mid;
                }
                else {

                    left = mid + 1;
                }
            }

            result.splice(
                left,
                0,
                value
            );

            metrics.assign();
        }

        for (
            let i = 0;
            i < arr.length;
            i++
        ) {

            arr[i] =
                result[i];

            metrics.assign();
        }
    }
};