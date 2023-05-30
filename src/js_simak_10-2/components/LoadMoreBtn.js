export default class LoadMoreBtn {
    constructor(selector, isHidden = true) {
        this.button = this.getButton(selector);

        if (isHidden) this.hide();
    }

    getButton() {
        return document.querySelector(selector);
    }

    enable() {
        this.button.disabled = false;
        this.button.textContent = "Load More";
    }

    disable() {
        this.button.disabled = true;
        this.button.textContent = "Loading...";
    }

    hide() {
        this.button.classList.add('hidden');
    }

    show() {
        this.button.classList.remove('hidden');
    }
}