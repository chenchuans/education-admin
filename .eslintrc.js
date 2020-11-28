
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    // "extends": "eslint: recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        // 缩进
        "indent": [
            "error",
            4 //
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        // 引号
        "quotes": [
            1,
            "single"
        ],
        // 分号结尾
        "semi": [
            "error",
            "always"
        ]
    }
};
