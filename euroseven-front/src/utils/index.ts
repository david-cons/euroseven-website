export function reverseArray<T>(arr: T[]): T[] {
  const reversedArr = [...arr]; // Create a copy of the original array
  const len = reversedArr.length;

  for (let i = 0; i < Math.floor(len / 2); i++) {
    // Swap elements at index i with their corresponding elements from the end
    const temp = reversedArr[i];
    reversedArr[i] = reversedArr[len - 1 - i];
    reversedArr[len - 1 - i] = temp;
  }

  return reversedArr;
}
