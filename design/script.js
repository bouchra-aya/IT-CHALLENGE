document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const generateButton = document.getElementById("generate");
    const likeButton = document.getElementById("like");
    const heartIcon = document.querySelector("#like img"); 
    const copyButton = document.getElementById("copy");
    
    let isLiked = false; 
    
    async function fetchQuote() {
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                headers: { 'X-Api-Key': 'azgN1lRen572Qfwn4dj92A==ZaV1cG1umA9GLmLT' } 
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const quoteData = data[0]; 
            quoteElement.textContent = `"${quoteData.quote}"`;
            authorElement.textContent = `— ${quoteData.author}`;
            isLiked = false;
            heartIcon.src = "heart.png"; 
        } catch (error) {
            console.error('Error fetching quote:', error);
            quoteElement.textContent = "Failed to load quote.";
            authorElement.textContent = "";
        }
    }

    
    copyButton.addEventListener("click", () => {
        const quoteText = quoteElement.textContent; 
        const authorText = authorElement.textContent; 
        const fullQuote = `${quoteText} ${authorText}`;

        navigator.clipboard.writeText(fullQuote).then(() => {
            alert("Quote copied to clipboard!");
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    });

    fetchQuote();

    generateButton.addEventListener("click", fetchQuote);
    
    likeButton.addEventListener("click", () => {
        isLiked = !isLiked; 
        heartIcon.src = isLiked ? "heart_filled.png" : "heart.png"; 
    });
});
