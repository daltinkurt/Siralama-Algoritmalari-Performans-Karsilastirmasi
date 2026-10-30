export default {

    name: "Gnome",

    sort(arr, metrics) {

        let pos = 0;

        while (pos < arr.length) {

            if (
                pos === 0 ||
                metrics.compare(
                    arr[pos - 1],
                    arr[pos]
                ) <= 0
            ) {
                pos++;
            }
            else {

                metrics.swap(
                    arr,
                    pos,
                    pos - 1
                );

                pos--;
            }
        }
    }
};