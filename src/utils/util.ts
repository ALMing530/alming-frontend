let start = 0
export function throttle(fn: () => void,wait: number){
    const now = Date.now()
    if(now-start>=wait){
        fn()
        start=now
    }
}