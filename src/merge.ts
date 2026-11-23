/**
 * @param collection1 sorted ascending
 * @param collection2 sorted DESCENDING
 * @param collection3 sorted ascending
 */

export function merge(
  collection1: number[],
  collection2: number[],
  collection3: number[],
): number[] {
  const result: number[] = [];
  let i = 0;
  let j = collection2.length - 1;
  let k = 0;

  while (i < collection1.length || j >= 0 || k < collection3.length) {
    const a = i < collection1.length ? collection1[i] : Infinity;
    const b = j >= 0 ? collection2[j] : Infinity;
    const c = k < collection3.length ? collection3[k] : Infinity;

    if (a <= b && a <= c) {
      result.push(a);
      i++;
    } else if (b <= c) {
      result.push(b);
      j--;
    } else {
      result.push(c);
      k++;
    }
  }

  return result;
}
