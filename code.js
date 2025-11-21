const fs = require("fs");

const data = JSON.parse(fs.readFileSync("input.json", "utf8"));

const n = data.keys.n;
const k = data.keys.k;

let xs = [];
let ys = [];

let count = 0;
for (let key of Object.keys(data)) {
    if (key === "keys") continue;
    count++;
    if (count > k) break;

    let base = parseInt(data[key].base);
    let value = data[key].value;

    let decodedY = parseInt(value, base);

    xs.push(parseInt(key));
    ys.push(decodedY);
}

function buildMatrix(xs, k) {
    let M = [];
    for (let i = 0; i < k; i++) {
        let row = [];
        for (let p = 0; p < k; p++) {
            row.push(Math.pow(xs[i], p));
        }
        M.push(row);
    }
    return M;
}

function gaussianSolve(A, b) {
    let n = A.length;

    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(A[j][i]) > Math.abs(A[maxRow][i])) maxRow = j;
        }

        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [b[i], b[maxRow]] = [b[maxRow], b[i]];

        for (let j = i + 1; j < n; j++) {
            let factor = A[j][i] / A[i][i];
            for (let k2 = i; k2 < n; k2++) A[j][k2] -= factor * A[i][k2];
            b[j] -= factor * b[i];
        }
    }

    let x = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = b[i];
        for (let j = i + 1; j < n; j++) sum -= A[i][j] * x[j];
        x[i] = sum / A[i][i];
    }
    return x;
}

let M = buildMatrix(xs, k);
let coefficients = gaussianSolve(M, ys);

console.log("Constant term C =", coefficients[0]);