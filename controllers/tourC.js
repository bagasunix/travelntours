
module.exports = {
    index: async (req, res, next) => {
        console.log("Hello ini index");
    },
    create: async (req, res, next) => {
        console.log("Hallo ini buat");
    },
    update: async (req, res, next) => {
        console.log("Hallo ini update");
    },
    delete: async (req, res, next) => {
        console.log("Hallo ini delete");
    },
}