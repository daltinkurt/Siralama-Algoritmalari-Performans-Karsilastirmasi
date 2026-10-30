export default {

    name: "Cycle",

    sort(arr, metrics) {

        const n = arr.length;

        for (
            let cycleStart = 0;
            cycleStart < n - 1;
            cycleStart++
        ) {

            let item = arr[cycleStart];
            let pos = cycleStart;

            for (
                let i = cycleStart + 1;
                i < n;
                i++
            ) {

                if (
                    metrics.compare(
                        arr[i],
                        item
                    ) < 0
                ) {
                    pos++;
                }
            }

            if (pos === cycleStart)
                continue;

            while (
                pos < n &&
                item === arr[pos]
            ) {
                pos++;
            }

            if (pos >= n)
                continue;

            let temp = arr[pos];
            arr[pos] = item;
            item = temp;

            metrics.assign(3);

            while (pos !== cycleStart) {

                pos = cycleStart;

                for (
                    let i = cycleStart + 1;
                    i < n;
                    i++
                ) {

                    if (
                        metrics.compare(
                            arr[i],
                            item
                        ) < 0
                    ) {
                        pos++;
                    }
                }

                while (
                    pos < n &&
                    item === arr[pos]
                ) {
                    pos++;
                }

                if (pos >= n)
                    break;

                temp = arr[pos];
                arr[pos] = item;
                item = temp;

                metrics.assign(3);
            }
        }
    }
};