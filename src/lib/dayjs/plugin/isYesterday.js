const plugin = (cls, fn) => {
    const isYesterday = function () {
        const comparisonTemplate = 'YYYY-MM-DD';
        const now = fn();
        return this.format(comparisonTemplate) === now.format(comparisonTemplate);
    };
    cls.prototype.isYesterday = isYesterday;
};
export default plugin;
