
/**
 * Points of regular polygon from number
 * @param {number} n number of angles
 */
const polygon = (n) =>[...Array(n).keys()]
    .map((v,i,arr)=>(i/arr.length)*Math.PI * 2)
    .map(angl=>[Math.sin(angl),Math.cos(angl)])
