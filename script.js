const container = document.querySelector('.container');
const input = document.querySelector('input');
const btn = document.querySelector('button');

const baseUrl = 'https://api.nekosapi.com/v3';

async function generateImagesAsync(limit) {
    try {
        const response = await fetch(`${baseUrl}/images/random?limit=${limit}&rating=safe`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        container.innerHTML = '';
        for (const item of data.items) {
            const div = document.createElement('div');
            div.classList.add('animated-bg');

            const img = document.createElement('img');
            
            img.setAttribute('src', item.image_url);
            div.appendChild(img);
            container.appendChild(div);
        }

        let imagesLoaded = 0;
        Array.from(document.querySelectorAll('img')).forEach((img) => {
            if (img.complete) {
                imagesLoaded++;
                if (imagesLoaded === limit) {
                    checkAllImagesLoaded();
                }
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    checkAllImagesLoaded();
                });

                img.addEventListener('error', () => {
                    imagesLoaded++;
                    checkAllImagesLoaded();
                });
            }
        });
    } catch (error) {
        console.error(`Couldn't get image: ${error}`);
    }
}

function checkAllImagesLoaded(cur, total) {
    if (cur === total) {
        console.log('All images have loaded.');
        for (const div of document.querySelectorAll('.container div')) {
            div.classList.remove('animated-bg');
        }
    }
}

btn.addEventListener('click', () => {
    if (input.value !== '') {
        if (Number(input.value) === 0) {
            container.innerHTML = '';
        } else if (Number(input.value) > 0) {
            generateImagesAsync(input.value);
        }
    } else {
        alert('Please input a number first.')
    }
});
