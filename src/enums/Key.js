export default class Key {
    static ENTER = 'Enter'
    static ESC   = 'Escape'
    static UP    = 'ArrowUp'
    static DOWN  = 'ArrowDown'
    static LEFT  = 'ArrowLeft'
    static RIGHT = 'ArrowRight'

    static isArrow = (key) => [this.UP, this.DOWN, this.LEFT, this.RIGHT].includes(key)
}