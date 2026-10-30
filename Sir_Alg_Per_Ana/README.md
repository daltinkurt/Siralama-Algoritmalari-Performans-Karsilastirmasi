# 🚀 Sorting Benchmark Pro

Modern web teknolojileri kullanılarak geliştirilmiş, çok algoritmalı sıralama benchmark uygulaması.

Uygulama farklı sıralama algoritmalarının performanslarını aynı veri kümesi üzerinde karşılaştırır, çalışma sürelerini ölçer, işlem sayılarını raporlar ve sonuçları grafiksel olarak gösterir.

---

## Özellikler

✅ 20+ sıralama algoritması

✅ Web Worker desteği

✅ Çoklu algoritma seçimi

✅ Tekrar Sayısı desteği

✅ Ortalama benchmark sonuçları

✅ Sonuç doğrulama (isSorted)

✅ Performans grafikleri

✅ Otomatik yavaş algoritma atlama

✅ Madalyalı sıralama sistemi

✅ Paralel çalıştırma (Worker Pool)

✅ Büyük veri kümeleri desteği

---

# Ekran Görüntüleri

## Benchmark Sonuçları

Aşağıdaki ekran görüntüsü, 100.000 elemanlık veri kümesi üzerinde gerçekleştirilen benchmark sonuçlarını göstermektedir.

- Çoklu algoritma karşılaştırması
- Madalyalı sıralama sistemi
- İşlem metrikleri
- Ortalama süre ölçümleri
- Doğruluk kontrolü (✅ / ❌)
- Tekrar Sayısı desteği

![Sorting Benchmark Pro](screenshots/benchmark-results.png)

---

## Grafikler

Benchmark tamamlandıktan sonra algoritmalar aşağıdaki grafiklerle karşılaştırılır:

- Süre Grafiği (ms)
- Toplam Adım Grafiği

![Charts](screenshots/charts.png)

# Desteklenen Algoritmalar

## O(n²)

- Bubble Sort
- Insertion Sort
- Selection Sort
- Cocktail Sort
- Gnome Sort
- Odd-Even Sort
- Cycle Sort

## Geliştirilmiş Karşılaştırmalı Algoritmalar

- Shell Sort
- Comb Sort
- Tree Sort
- Strand Sort
- Tournament Sort
- Patience Sort
- Library Sort

## O(n log n)

- Quick Sort (Iterative)
- Merge Sort
- Heap Sort
- TimSort
- IntroSort
- InPlaceMerge Sort

---

# Benchmark Mantığı

Her algoritma aynı veri kümesi üzerinde çalıştırılır.

Örneğin:

```text
Veri Boyutu : 100.000
Tekrar Sayısı : 5
Algoritma Sayısı : 20
```

Toplam benchmark sayısı:

```text
20 x 5 = 100
```

olarak hesaplanır.

Sonuçlar:

```text
Ortalama Süre
Ortalama Karşılaştırma
Ortalama Swap
Ortalama Atama
Ortalama Adım
```

şeklinde raporlanır.

---

# Veri Kümeleri

Desteklenen veri tipleri:

- Random
- Sorted
- Reverse Sorted

Önemli:

Tekrar Sayısı kullanıldığında her algoritma aynı veri kümesinin kopyası üzerinde çalıştırılır.

Bu sayede benchmark sonuçları adil ve karşılaştırılabilir olur.

---

# Sonuç Doğrulama

Her benchmark sonrasında:

```javascript
isSorted(arr)
```

kontrolü yapılır.

Sonuç sütunu:

```text
✅ Doğru sıralandı
❌ Hatalı sıralandı
```

şeklinde gösterilir.

---

# Madalya Sistemi

En hızlı algoritmalar otomatik sıralanır:

```text
🥇 Birinci
🥈 İkinci
🥉 Üçüncü
```

Atlanan algoritmalar sıralamaya dahil edilmez.

---

# Otomatik Atlama Sistemi

Bazı algoritmalar büyük veri kümelerinde çok yavaş çalışır.

Sistem şu algoritmaları gerektiğinde otomatik atlar:

```text
Bubble
Insertion
Selection
Cocktail
Gnome
OddEven
Cycle
Tree
Strand
Tournament
Patience
InPlaceMerge
```

Atlanan algoritmalar:

```text
ATLANDI
```

olarak raporlanır.

---

# Grafikler

Chart.js kullanılarak:

### Süre Grafiği

```text
ms bazında süre karşılaştırması
```

### Adım Grafiği

```text
Toplam adım karşılaştırması
```

oluşturulur.

---

# Proje Yapısı

```text
sorting-benchmark/
│
├── index.html
├── main.js
│
├── algorithms/
│   ├── bubble.js
│   ├── cocktail.js
│   ├── comb.js
│   ├── cycle.js
│   ├── gnome.js
│   ├── heap.js
│   ├── inplacemerge.js
│   ├── insertion.js
│   ├── introsort.js
│   ├── library.js
│   ├── merge.js
│   ├── oddeven.js
│   ├── patience.js
│   ├── quick.js
│   ├── selection.js
│   ├── shell.js
│   ├── strand.js
│   ├── timsort.js
│   ├── tournament.js
│   ├── tree.js
│   └── index.js
│
├── core/
│   ├── dataset.js
│   ├── metrics.js
│   └── workerPool.js
│
└── workers/
    └── sortingWorker.js
```

---

# Çalıştırma

## Python

```bash
python -m http.server 8080
```

---

## Node.js

```bash
npx serve .
```

---

## Vite

```bash
npm install
npm run dev
```

---

# Kullanılan Teknolojiler

- HTML5
- CSS3
- JavaScript ES2023
- Web Workers
- Chart.js

---

# Amaç

Bu proje eğitim, analiz ve performans karşılaştırması amacıyla geliştirilmiştir.

Farklı sıralama algoritmalarının davranışlarını:

- küçük veri kümelerinde
- büyük veri kümelerinde
- sıralı verilerde
- ters sıralı verilerde

incelemek için kullanılabilir.

---

## Lisans

MIT License