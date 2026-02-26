document.addEventListener('DOMContentLoaded', function () {
    // 1. Back to Top Logic
    const topBtn = document.getElementById('backToTop');
    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }
    };

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Automatic TOC Generation
    const tocContainer = document.getElementById('tocContent');
    const articleBody = document.querySelector('.article-content');

    if (tocContainer && articleBody) {
        const headings = articleBody.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            const ul = document.createElement('ul');
            headings.forEach((heading, index) => {
                const id = 'heading-' + index;
                heading.setAttribute('id', id);

                const li = document.createElement('li');
                li.style.marginLeft = heading.tagName === 'H3' ? '20px' : '0';

                const a = document.createElement('a');
                a.href = '#' + id;
                a.textContent = heading.textContent;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
                });

                li.appendChild(a);
                ul.appendChild(li);
            });
            tocContainer.appendChild(ul);
        } else {
            document.getElementById('tocBox').style.display = 'none';
        }
    }

    // 3. TOC Toggle
    const tocHeader = document.getElementById('tocHeader');
    if (tocHeader) {
        tocHeader.addEventListener('click', () => {
            const content = document.getElementById('tocContent');
            const icon = tocHeader.querySelector('i');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    }

    // 4. Share Logic
    window.shareTo = function (platform) {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    }
});
