export default {

    name: "Patience",

    sort(arr, metrics) {

        const piles = [];

        // Pile oluşturma

        for (const value of arr) {

            let placed = false;

            for (const pile of piles) {

                if (
                    metrics.compare(
                        value,
                        pile[pile.length - 1]
                    ) <= 0
                ) {

                    pile.push(value);

                    metrics.assign();

                    placed = true;

                    break;
                }
            }

            if (!placed) {

                piles.push([value]);

                metrics.assign();
            }
        }

        // Tüm elemanları çıkar

        const result = [];

        while (piles.length > 0) {

            let minPileIndex = -1;
            let minValue = Infinity;

            for (
                let i = 0;
                i < piles.length;
                i++
            ) {

                const pile = piles[i];

                const value =
                    pile[pile.length - 1];

                if (
                    metrics.compare(
                        value,
                        minValue
                    ) < 0
                ) {
                    minValue = value;
                    minPileIndex = i;
                }
            }

            result.push(minValue);

            metrics.assign();

            piles[minPileIndex].pop();

            if (
                piles[minPileIndex].length === 0
            ) {

                piles.splice(
                    minPileIndex,
                    1
                );
            }
        }

        // Result tersten oluşuyor

        // result.reverse();

        for (
            let i = 0;
            i < result.length;
            i++
        ) {

            arr[i] = result[i];

            metrics.assign();
        }
    }
};