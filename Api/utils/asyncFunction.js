//
// async function f() {
//
//     await console.log('1');
//     await console.log('2');
//     await setTimeout(async function () {
//         await console.log('3');
//
//     },3000);
//     await console.log('4');
// }
// f();
// function wait(ms) {
//     return new Promise(r => setTimeout(r, ms))
// }
//
// function main() {
//     console.log('sắp rồi...')
//     wait(2007).then(() => {
//         console.log('chờ tí...')
//         return wait(2007)
//     }).then(() => {
//         console.log('thêm chút nữa thôi...')
//         return wait(2012)
//     }).then(() => {
//         console.log('thêm chút nữa thôi...')
//         return wait(2016)
//     }).then(() => {
//         console.log('xong rồi đấy!')
//     })
// }
function wait(ms) {
    return new Promise(r => setTimeout(r, ms))
}

async function main() {
    console.log('sắp rồi...')
    await wait(2007)
    console.log('chờ tí...')
    await wait(2012)
    console.log('thêm chút nữa thôi...')
    // await wait(2016)
    await setTimeout(function () {
    },2000)
    console.log('xong rồi đấy!')
}
main()