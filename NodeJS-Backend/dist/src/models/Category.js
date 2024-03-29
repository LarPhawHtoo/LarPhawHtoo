"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    //id: String,
    categoryName: {
        type: String
    },
    categoryDescription: {
        type: String
    },
    categoryImgUrl: {
        type: String,
    },
    categoryContent: {
        type: String
    },
    updated: {
        type: Date, default: Date.now
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Category", categorySchema);
