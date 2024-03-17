export function debounceSearch(fn, waitTime){
    let timer;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        const context = this;
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, waitTime);
    }
}