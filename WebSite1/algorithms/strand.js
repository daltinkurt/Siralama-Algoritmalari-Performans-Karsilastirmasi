export default {

    name: "Strand",

    sort(arr, metrics) {

        if (
            arr.length <= 1
        )
            return;

        let result = [];

        while (
            arr.length > 0
        ) {

            const strand = [
                arr.shift()
            ];

            for (
                let i = 0;
                i < arr.length;
            ) {

                if (
                    metrics.compare(
                        arr[i],
                        strand[
                        strand.length - 1
                        ]
                    ) >= 0
                ) {

                    strand.push(
                        arr.splice(
                            i,
                            1
                        )[0]
                    );

                    metrics.assign();
                }
                else {

                    i++;
                }
            }

            result =
                merge(
                    result,
                    strand,
                    metrics
                );
        }

        arr.length = 0;

        for (const item of result) {

            arr.push(item);

            metrics.assign();
        }
    }
};

function merge(
    a,
    b,
    metrics
) {

    const result = [];

    let i = 0;
    let j = 0;

    while (
        i < a.length &&
        j < b.length
    ) {

        if (
            metrics.compare(
                a[i],
                b[j]
            ) <= 0
        ) {

            result.push(
                a[i++]
            );
        }
        else {

            result.push(
                b[j++]
            );
        }

        metrics.assign();
    }

    while (i < a.length)
        result.push(
            a[i++]
        );

    while (j < b.length)
        result.push(
            b[j++]
        );

    return result;
}