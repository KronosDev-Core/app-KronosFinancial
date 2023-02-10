function toArray() {
    return [
        this.year(),
        this.month(),
        this.date(),
        this.hour(),
        this.minute(),
        this.second(),
        this.millisecond(),
    ];
}
const plugin = (cls) => {
    cls.prototype.toArray = toArray;
};
export default plugin;
