export default {

    name: "Tournament",

    sort(arr, metrics) {

        const input = [...arr];
        const result = [];

        while (input.length > 0) {

            let minIndex = 0;

            for (let i = 1; i < input.length; i++) {

                if (
                    metrics.compare(
                        input[i],
                        input[minIndex]
                    ) < 0
                ) {
                    minIndex = i;
                }
            }

            result.push(
                input.splice(
                    minIndex,
                    1
                )[0]
            );

            metrics.assign();
        }

        for (let i = 0; i < result.length; i++) {

            arr[i] = result[i];

            metrics.assign();
        }
    }
};