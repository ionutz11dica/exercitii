function applyBlackFriday(products, discount){
    return new Promise((resolve, reject) => {
        if(typeof discount !== "number")
            reject(new Error("Invalid discount"));
        if(products.filter(product => !(typeof product.name === "string" &&
            typeof product.price === "number")).length)
            reject(new Error("Invalid array format"));
        if(discount > 0 && discount <= 10){
            resolve(products.map(product => {
                let val = product.price * discount / 100;
                return { ...product,
                        price: product.price - val
                }
            }))
        } else {
            reject(new Error("Discount not applicable"));
        }
    });
}

const app = {
    applyBlackFriday: applyBlackFriday
};
module.exports = app;