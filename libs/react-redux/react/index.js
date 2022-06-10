// See tagged template string lesson
export default function render ([first, ...strings], ...values) {
    return values.reduce((acc, value) =>
    acc.concat(value, strings.shift()),
    [first])
    .filter(elem => elem && elem !== true || elem === 0) // remove true, false but keep 0
    .join(''); 
}