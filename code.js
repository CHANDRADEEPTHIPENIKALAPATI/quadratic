const f = require("fs");
const j = JSON.parse(f.readFileSync("input.json", "utf8"));

const n = j.keys.n;
const k = j.keys.k;

let X = [];
let Y = [];
let u = 0;

for (let q of Object.keys(j)) {
    if (q === "keys") continue;
    u++;
    if (u > k) break;

    let bs = parseInt(j[q].base);
    let vl = j[q].value;
    let yv = parseInt(vl, bs);

    X.push(parseInt(q));
    Y.push(yv);
}

function M(a, kk) {
    let m = [];
    for (let i = 0; i < kk; i++) {
        let r = [];
        for (let p = 0; p < kk; p++) r.push(Math.pow(a[i], p));
        m.push(r);
    }
    return m;
}

function S(A, B) {
    let n1 = A.length;
    for (let i = 0; i < n1; i++) {
        let mx = i;
        for (let j = i + 1; j < n1; j++)
            if (Math.abs(A[j][i]) > Math.abs(A[mx][i])) mx = j;

        [A[i], A[mx]] = [A[mx], A[i]];
        [B[i], B[mx]] = [B[mx], B[i]];

        for (let j = i + 1; j < n1; j++) {
            let fc = A[j][i] / A[i][i];
            for (let k2 = i; k2 < n1; k2++) A[j][k2] -= fc * A[i][k2];
            B[j] -= fc * B[i];
        }
    }

    let z = Array(n1).fill(0);
    for (let i = n1 - 1; i >= 0; i--) {
        let sm = B[i];
        for (let j = i + 1; j < n1; j++) sm -= A[i][j] * z[j];
        z[i] = sm / A[i][i];
    }
    return z;
}

let A = M(X, k);
let C = S(A, Y);

console.log("C =", C[0]);
