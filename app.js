document.getElementById('searchBtn').addEventListener('click', () => {
    const word = document.getElementById('wordInput').value.trim();
    if (word) {
        fetchWordDefinition(word);
    } else {
        document.getElementById('result').innerHTML = `<p class="text-red-500">Please enter a word.</p>`;
    }
});

async function fetchWordDefinition(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        displayDefinition(data);
    } catch (error) {
        document.getElementById('result').innerHTML = `<p class="text-red-500">${error.message}. Please try again.</p>`;
    }
}

function displayDefinition(data) {
    if (!data || data.title === "No Definitions Found") {
        document.getElementById('result').innerHTML = `<p class="text-red-500">No definition found for the word.</p>`;
        return;
    }
    const wordData = data[0];
    const word = wordData.word;
    const phonetic = wordData.phonetic ? `<p class="italic text-fuchsia-800">${wordData.phonetic}</p>` : '';
    const meanings = wordData.meanings.map(meaning => {
        const partOfSpeech = `<p class="font-semibold">${meaning.partOfSpeech}</p>`;
        const definitions = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
        return `<div>${partOfSpeech}<ul class="list-disc list-inside">${definitions}</ul></div>`;
    }).join('');

    document.getElementById('result').innerHTML = `
        <h2 class="text-xl text-black font-bold">${word}</h2>
        ${phonetic}
        <div class="mt-2 text-black">${meanings}</div>
    `;
}
