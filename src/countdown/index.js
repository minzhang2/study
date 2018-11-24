let left;
function time() {
  const end = new Date('2018/11-07 08:00:00');
  const now = Date.now();
  console.log(now)
  left = end - now;
  const d = Math.floor(left / (1000 * 60 * 60 * 24));
  const h = Math.floor((left / (1000 * 60 * 60) % 24));
  const m = Math.floor((left / (1000 * 60)) % 60);
  const s = Math.floor((left / 1000) % 60) ;
  console.log(`${d}-${h}-${m}-${s}`)

}
const interval = setInterval(() => {
  if(left === 0) {
    clearInterval(interval);
  }
  time();
}, 1000);
