async function addAd() {
    const title = document.getElementById('adTitle').value;
    const description = document.getElementById('adDescription').value;
    const url = document.getElementById('adUrl').value;
    if (!title || !description || !url) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }
    const response = await fetch('/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, url })
    });
    const newAd = await response.json();
    alert('Reklam eklendi!');
    listAds();
}

async function listAds() {
    const adList = document.getElementById('adList');
    adList.innerHTML = '';
    const response = await fetch('/ads');
    const ads = await response.json();
    ads.forEach(ad => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${ad.url}" target="_blank">${ad.title}</a> - ${ad.description}`;
        adList.appendChild(li);
    });
}

window.onload = listAds;