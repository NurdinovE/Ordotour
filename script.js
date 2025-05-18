document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('concertVideo');

    // По умолчанию видео запускается без звука (из-за автоплей-политик браузера)
    video.muted = true;

    // Функция-обработчик для Intersection Observer
    const onIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Когда видео полностью или частично в viewport — play + включить звук
                video.play().catch(() => {});
                video.muted = false;
            } else {
                // Когда видео вне viewport — пауза + отключить звук
                video.pause();
                video.muted = true;
            }
        });
    };

    // Создаём observer; threshold можно настроить (0.5 = 50% видимости)
    const observer = new IntersectionObserver(onIntersection, {
        root: null,           // null = весь viewport
        threshold: 0.5        // сработает, когда 50% видео видно
    });

    // Начать наблюдение за видео
    observer.observe(video);
});
