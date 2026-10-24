// --- AMBIL ELEMEN DOM ---
const textInput = document.getElementById("text-input");
const btnCount = document.getElementById("btn-count");
const btnClear = document.getElementById("btn-clear");
const totalWordsDisplay = document.getElementById("total-words");
const uniqueWordsDisplay = document.getElementById("unique-words");
const freqListContainer = document.getElementById("freq-list");

// --- FUNGSI ANALISIS FREKUENSI KATA ---
function calculateWordFrequency() {
    const text = textInput.value.trim();

    if (!text) {
        totalWordsDisplay.textContent = "0";
        uniqueWordsDisplay.textContent = "0";
        freqListContainer.innerHTML = `<p class="placeholder-text">Hasil analisis frekuensi kata akan muncul di sini secara berurutan...</p>`;
        return;
    }

    // 1. Ubah ke huruf kecil dan bersihkan tanda baca / simbol menggunakan RegExp
    const cleanedText = text.toLowerCase().replace(/[^\w\sà-öø-ÿ]/g, "");
    
    // 2. Pecah teks menjadi array kata berdasarkan spasi atau baris baru
    const wordsArray = cleanedText.split(/\s+/).filter((w) => w.length > 0);
    const totalWords = wordsArray.length;

    // 3. Hitung kemunculan menggunakan objek Map / Dictionary
    const frequencyMap = {};
    wordsArray.forEach((word) => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    const uniqueWords = Object.keys(frequencyMap).length;

    // 4. Ubah objek ke array dan urutkan berdasarkan jumlah kemunculan terbanyak (descending)
    const sortedWords = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);

    // 5. Update Statistik UI
    totalWordsDisplay.textContent = totalWords.toLocaleString("id-ID");
    uniqueWordsDisplay.textContent = uniqueWords.toLocaleString("id-ID");

    // 6. Render Peringkat ke DOM
    freqListContainer.innerHTML = "";
    sortedWords.forEach(([word, count]) => {
        const item = document.createElement("div");
        item.className = "freq-item";

        item.innerHTML = `
            <span class="freq-word">${word}</span>
            <span class="freq-count">${count}x</span>
        `;

        freqListContainer.appendChild(item);
    });
}

// --- EVENT LISTENERS ---
btnCount.addEventListener("click", calculateWordFrequency);

textInput.addEventListener("input", calculateWordFrequency);

btnClear.addEventListener("click", () => {
    textInput.value = "";
    calculateWordFrequency();
    textInput.focus();
});

// Inisialisasi awal
calculateWordFrequency();