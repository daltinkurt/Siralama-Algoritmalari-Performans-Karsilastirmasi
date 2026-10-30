import algorithms from "../algorithms/index.js";
import { Metrics } from "../core/metrics.js";

function isSorted(arr) {

    for (let i = 1; i < arr.length; i++) {

        if (arr[i - 1] > arr[i]) {

            return false;
        }
    }

    return true;
}

self.onmessage = (event) => {

    try {

        const {
            algorithm,
            dataset
        } = event.data;

        const sorter =
            algorithms.find(
                x => x.name === algorithm
            );

        if (!sorter) {

            throw new Error(
                `Algoritma bulunamadı: ${algorithm}`
            );
        }

        const arr = [...dataset];

        const metrics =
            new Metrics();

        const start =
            performance.now();

        sorter.sort(
            arr,
            metrics
        );

        const duration =
            performance.now() - start;

        const sorted =
            isSorted(arr);

        if (!sorted) {

            console.error(
                algorithm,
                "FAILED"
            );

            console.log(
                "İlk 30 eleman:",
                arr.slice(0, 30)
            );
        }

        self.postMessage({

            algorithm,

            comparisons:
                metrics.comparisons,

            swaps:
                metrics.swaps,

            assignments:
                metrics.assignments,

            steps:
                metrics.total(),

            duration,

            sorted,

            success: true
        });

    }
    catch (error) {

        console.error(error);

        self.postMessage({

            success: false,

            algorithm:
                event.data?.algorithm,

            error:
                error.message
        });
    }
};