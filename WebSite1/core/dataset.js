/**
 * Test verisi oluşturur
 * type:
 *  - random
 *  - sorted
 *  - reverse
 */
export function createDataset(type, size) {

    const arr = [];

    for (let i = 0; i < size; i++) {
        arr.push(i);
    }

    switch (type) {

        case "random":
            shuffle(arr);
            break;

        case "reverse":
            arr.reverse();
            break;

        case "sorted":
        default:
            break;
    }

    return arr;
}

/**
 * Fisher-Yates shuffle
 */
function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [arr[i], arr[j]] =
            [arr[j], arr[i]];
    }
}

/**
 * Çok tekrar eden değerler içeren veri
 */
export function createDuplicateDataset(size) {

    const arr = [];

    for (let i = 0; i < size; i++) {

        arr.push(
            Math.floor(
                Math.random() * 100
            )
        );
    }

    return arr;
}

/**
 * Neredeyse sıralı veri
 */
export function createNearlySortedDataset(
    size,
    disorderPercent = 5
) {

    const arr = [];

    for (let i = 0; i < size; i++) {
        arr.push(i);
    }

    const swapCount =
        Math.floor(
            size *
            disorderPercent /
            100
        );

    for (let i = 0; i < swapCount; i++) {

        const a =
            Math.floor(
                Math.random() * size
            );

        const b =
            Math.floor(
                Math.random() * size
            );

        [arr[a], arr[b]] =
            [arr[b], arr[a]];
    }

    return arr;
}

/**
 * Benchmark ekranında seçilen veri tipine göre
 * dataset üretmek için kullanılabilir.
 */
export function buildDataset(
    type,
    size
) {

    switch (type) {

        case "random":
            return createDataset(
                "random",
                size
            );

        case "sorted":
            return createDataset(
                "sorted",
                size
            );

        case "reverse":
            return createDataset(
                "reverse",
                size
            );

        case "duplicate":
            return createDuplicateDataset(
                size
            );

        case "nearlysorted":
            return createNearlySortedDataset(
                size
            );

        default:
            return createDataset(
                "random",
                size
            );
    }
}