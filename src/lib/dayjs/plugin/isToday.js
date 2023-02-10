const plugin = (cls, fn) => {
    const isToday = function () {
        const comparisonTemplate = 'YYYY-MM-DD';
        const now = fn();
        return this.format(comparisonTemplate) === now.format(comparisonTemplate);
    };
    cls.prototype.isToday = isToday;
};
export default plugin;
