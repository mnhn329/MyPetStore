class Rate {
    constructor(id, description, price, estimateDays) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.estimateDays = estimateDays;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }
    
    setPrice(price) {
        this.price = price;
    }

    getPrice() {
        return this.price;
    }
    
    setEstimateDays(estimateDays) {
        this.estimateDay = estimateDays;
    }

    getEstimateDays() {
        return this.estimateDays;
    }
}

module.exports = Rate;