import algorithms from "./algorithms/index.js";
import { createDataset } from "./core/dataset.js";
import { WorkerPool } from "./core/workerPool.js";

let timeChart = null;
let stepChart = null;

const runBtn =
    document.getElementById("runBtn");

populateAlgorithmList();
setupAlgorithmButtons();

runBtn.addEventListener(
    "click",
    runBenchmark
);

function populateAlgorithmList() {
    const select =
        document.getElementById(
            "algorithmSelect"
        );

    select.innerHTML = "";

    algorithms.forEach(alg => {
        const option =
            document.createElement(
                "option"
            );

        option.value =
            alg.name;

        option.textContent =
            alg.name;

        option.selected = true;

        select.appendChild(
            option
        );
    });
}

function setupAlgorithmButtons() {
    const selectAllBtn =
        document.getElementById(
            "selectAllBtn"
        );

    const clearAllBtn =
        document.getElementById(
            "clearAllBtn"
        );

    if (selectAllBtn) {
        selectAllBtn.addEventListener(
            "click",
            () => {
                [...document.getElementById(
                    "algorithmSelect"
                ).options]

                    .forEach(
                        x => x.selected = true
                    );
            }
        );
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener(
            "click",
            () => {
                [...document.getElementById(
                    "algorithmSelect"
                ).options]

                    .forEach(
                        x => x.selected = false
                    );
            }
        );
    }
}

async function runBenchmark() {
    const MEDIUM_LIMIT = 50000;
    const LARGE_LIMIT = 100000;
    const slowAlgorithms = [

        "Bubble",
        "Insertion",
        "Selection",

        "Cocktail",
        "Gnome",
        "OddEven"
    ];

    const verySlowAlgorithms = [

        "Cycle",
        "Tree",
        "Strand",

        "Tournament",
        "Patience",

        "InPlaceMerge"
    ];

   

    try {
        runBtn.disabled = true;

        clearResults();

        const repeatCount =
            parseInt(
                document.getElementById(
                    "repeatCount"
                ).value
            );

        document
            .getElementById(
                "currentRepeat"
            )
            .innerText = repeatCount;

        updateStatus(
            `Veri kümesi hazırlanıyor... (${repeatCount} tekrar)`
        );

        const datasetType =
            document.getElementById(
                "datasetType"
            ).value;

        const datasetSize =
            parseInt(
                document.getElementById(
                    "datasetSize"
                ).value
            );

        const workerCount =
            parseInt(
                document.getElementById(
                    "workerCount"
                ).value
            );

        const selectedNames =

            [...document.getElementById(
                "algorithmSelect"
            ).selectedOptions]

                .map(
                    x => x.value
                );

        if (
            selectedNames.length === 0
        ) {
            alert(
                "En az bir algoritma seçmelisiniz."
            );

            runBtn.disabled = false;

            return;
        }

        const selectedAlgorithms =

            algorithms.filter(
                alg =>
                    selectedNames.includes(
                        alg.name
                    )
            );

        document
            .getElementById(
                "algorithmCount"
            )
            .innerText =
            selectedAlgorithms.length;

        const dataset =
            createDataset(
                datasetType,
                datasetSize
            );

        // updateStatus(
        //     "Veri kümesi hazırlanıyor..."
        // );

        const pool =
            new WorkerPool(
                "./workers/sortingWorker.js",
                workerCount
            );

        const benchmarkStart =
            performance.now();

        const totalRuns =
            selectedAlgorithms.length *
            repeatCount;

        let completedRuns = 0;

        const tasks =

            selectedAlgorithms.map(
                algorithm => {
                    if (
                        (
                            datasetSize >= MEDIUM_LIMIT &&
                            slowAlgorithms.includes(
                                algorithm.name
                            )
                        )
                        ||
                        (
                            datasetSize >= LARGE_LIMIT &&
                            verySlowAlgorithms.includes(
                                algorithm.name
                            )
                        )
                    ) {
                        completedRuns += repeatCount;

                        updateProgress(
                            completedRuns,
                            totalRuns,
                            `${algorithm.name} (ATLANDI)`
                        );

                        return Promise.resolve({

                            algorithm:
                                algorithm.name,

                            comparisons: 0,
                            swaps: 0,
                            assignments: 0,
                            steps: 0,
                            duration: 0,

                            skipped: true,

                            sorted: null
                        });
                    }

                    return benchmarkAlgorithm(

                        pool,

                        algorithm.name,

                        dataset,

                        repeatCount,

                        (
                            name,
                            currentRun,
                            totalRunCount
                        ) => {

                            completedRuns++;

                            updateProgress(

                                completedRuns,

                                totalRuns,

                                `${name} (${currentRun}/${totalRunCount})`

                            );
                        }
                    ).then(result => result);
                }
            );

        const results =
            await Promise.all(
                tasks
            );

        const benchmarkEnd =
            performance.now();

        renderResults(
            results
        );

        document
            .getElementById(
                "totalTime"
            )
            .innerText =
            (
                benchmarkEnd -
                benchmarkStart
            ).toFixed(2) +
            " ms";

        updateStatus(
            "Benchmark tamamlandı"
        );
    }
    catch (error) {
        console.error(
            error
        );

        updateStatus(
            "Benchmark sırasında hata oluştu."
        );
    }
    finally {
        runBtn.disabled =
            false;
    }
}

function updateStatus(text) {
    document
        .getElementById(
            "currentStatus"
        )
        .innerText =
        text;
}

function updateProgress(
    completed,
    total,
    algorithm
) {
    const percent =
        Math.round(
            completed *
            100 /
            total
        );

    document
        .getElementById(
            "currentStatus"
        )
        .innerText =
        `${algorithm} tamamlandı (%${percent})`;

    document
        .getElementById(
            "progressFill"
        )
        .style.width =
        percent + "%";
}

function clearResults() {
    const tbody =
        document.getElementById(
            "resultBody"
        );

    tbody.innerHTML = "";

    document
        .getElementById(
            "bestAlgorithm"
        )
        .innerText = "-";

    document
        .getElementById(
            "worstAlgorithm"
        )
        .innerText = "-";

    document
        .getElementById(
            "totalTime"
        )
        .innerText = "-";

    document
        .getElementById(
            "currentRepeat"
        )
        .innerText = "-";

   document
       .getElementById(
            "executedCount"
        )
        .innerText = "-";

   document
       .getElementById(
            "skippedCount"
        )
        .innerText = "-";

    document
        .getElementById(
            "progressFill"
        )
        .style.width = "0%";

    if (timeChart)
        timeChart.destroy();

    if (stepChart)
        stepChart.destroy();
}

function renderResults(results) {
    const tbody =
        document.getElementById(
            "resultBody"
        );

    const activeResults =
        results.filter(
            x => !x.skipped
        );
    const skippedResults =
        results.filter(
            x => x.skipped
        );

    activeResults.sort(
        (a, b) =>
            a.duration - b.duration
    );
    const sorted = [
        ...activeResults,
        ...skippedResults
    ];

    const fastest =
        activeResults.length > 0
            ? activeResults[0]
            : null;

    const slowest =
        activeResults.length > 0
            ? activeResults[
            activeResults.length - 1
            ]
            : null;

    document
        .getElementById(
            "bestAlgorithm"
        )
        .innerText =
        fastest
            ? fastest.algorithm
            : "-";

    document
        .getElementById(
            "worstAlgorithm"
        )
        .innerText =
        slowest
            ? slowest.algorithm
            : "-";

    document.getElementById(
        "executedCount"
    ).innerText =
        activeResults.length;

    document.getElementById(
        "skippedCount"
    ).innerText =
        skippedResults.length;

    let rank = 0;

    sorted.forEach((result, index) => {
        if (!result.skipped) {
            rank++;
        }
        const tr =
            document.createElement(
                "tr"
            );

        if (result.skipped) {
            tr.classList.add(
                "skipped"
            );
        }
        else {
            // if (
            //     result.algorithm ===
            //     fastest.algorithm
            // ) {
            //     tr.classList.add(
            //         "fastest"
            //     );
            // }

            // if (
            //     result.algorithm ===
            //     slowest.algorithm
            // ) {
            //     tr.classList.add(
            //         "slowest"
            //     );
            // }
        }

        tr.innerHTML = `
    <td>
${result.skipped
                ? " - "
                : rank === 1
                    ? "🥇 1"
                    : rank === 2
                        ? "🥈 2"
                        : rank === 3
                            ? "🥉 3"
                            : rank
            }
</td>
     <td>${result.algorithm}</td>

    <td>${result.skipped
                ? "-"
                : result.comparisons
            }</td>

    <td>${result.skipped
                ? "-"
                : result.swaps
            }</td>

    <td>${result.skipped
                ? "-"
                : result.assignments
            }</td>

    <td>${result.skipped
                ? "-"
                : result.steps
            }</td>

    <td>${result.skipped
                ? "ATLANDI"
                : result.duration.toFixed(2)
            }</td>

           <td>
${
            result.skipped
                ? "-"
                : (
                    result.sorted
                        ? "✅"
                        : "❌"
                )
}
</td>
`;

        tbody.appendChild(
            tr
        );
    });

    drawCharts(
        activeResults
    );
}

function drawCharts(results) {
    const labels =
        results.map(
            x => x.algorithm
        );

    const durations =
        results.map(
            x => x.duration
        );

    const steps =
        results.map(
            x => x.steps
        );

    if (timeChart)
        timeChart.destroy();

    if (stepChart)
        stepChart.destroy();

    timeChart =
        new Chart(
            document
                .getElementById(
                    "timeChart"
                )
                .getContext(
                    "2d"
                ),
            {
                type: "bar",

                data: {
                    labels,

                    datasets: [{
                        label: "Süre (ms)",

                        data:
                            durations,

                        backgroundColor:
                            "#3b82f6"
                    }]
                }
            }
        );

    stepChart =
        new Chart(
            document
                .getElementById(
                    "stepChart"
                )
                .getContext(
                    "2d"
                ),
            {
                type: "bar",

                data: {
                    labels,

                    datasets: [{
                        label:
                            "Toplam Adım",

                        data:
                            steps,

                        backgroundColor:
                            "#22c55e"
                    }]
                }
            }
        );
}

async function benchmarkAlgorithm(
    pool,
    algorithmName,
    dataset,
    repeatCount,
    progressCallback
) {

    const runs = [];

    for (
        let i = 0;
        i < repeatCount;
        i++
    ) {

        const result =
            await pool.run({

                algorithm:
                    algorithmName,

                dataset:
                    [...dataset]

            });

        runs.push(
            result
        );

        progressCallback?.(

            algorithmName,

            i + 1,

            repeatCount
        );
    }

    console.log(
        algorithmName,
        runs
    );

    return {

        algorithm:
            algorithmName,

        comparisons:
            Math.round(
                runs.reduce(
                    (a, b) =>
                        a + b.comparisons,
                    0
                ) / repeatCount
            ),

        swaps:
            Math.round(
                runs.reduce(
                    (a, b) =>
                        a + b.swaps,
                    0
                ) / repeatCount
            ),

        assignments:
            Math.round(
                runs.reduce(
                    (a, b) =>
                        a + b.assignments,
                    0
                ) / repeatCount
            ),

        steps:
            Math.round(
                runs.reduce(
                    (a, b) =>
                        a + b.steps,
                    0
                ) / repeatCount
            ),

        duration:
            runs.reduce(
                (a, b) =>
                    a + b.duration,
                0
            ) / repeatCount,

        sorted:
            runs.every(
                x => x.sorted
            ),

        skipped: false
    };
}
