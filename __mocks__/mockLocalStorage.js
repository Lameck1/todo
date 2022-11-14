const mockLocalStorage = (function () {
    let store = {
        todos: '[]',
    };

    return {
        getItem: (key) => store[key],
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {
                tasks: '[]',
            };
        },
    };
}());

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });