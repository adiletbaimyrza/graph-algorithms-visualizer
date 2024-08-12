import TVxId from '../types/TVxId'

class MinHeap<T> {
  private heap: Array<T>
  private compare: (a: T, b: T) => number

  constructor(compareFn: (a: T, b: T) => number) {
    this.heap = []
    this.compare = compareFn
  }

  private parent(idx: TVxId) {
    return Math.floor((idx - 1) / 2)
  }

  private leftChild(idx: TVxId) {
    return 2 * idx + 1
  }

  private rightChild(idx: TVxId) {
    return 2 * idx + 2
  }

  private heapifyUp(idx: TVxId) {
    const parent = this.parent(idx)

    if (idx > 0 && this.compare(this.heap[idx], this.heap[parent]) < 0) {
      this.swap(idx, parent)
      this.heapifyUp(parent)
    }
  }

  private heapifyDown(idx: TVxId) {
    const left = this.leftChild(idx)
    const right = this.rightChild(idx)
    let smallest = idx

    if (
      left < this.heap.length &&
      this.compare(this.heap[left], this.heap[smallest]) < 0
    ) {
      smallest = left
    }

    if (
      right < this.heap.length &&
      this.compare(this.heap[right], this.heap[smallest]) < 0
    ) {
      smallest = right
    }

    if (smallest !== idx) {
      this.swap(idx, smallest)
      this.heapifyDown(smallest)
    }
  }

  private swap(idx1: number, idx2: number) {
    const temp = this.heap[idx1]
    this.heap[idx1] = this.heap[idx2]
    this.heap[idx2] = temp
  }

  public extractMin() {
    if (this.heap.length === 0) {
      throw new Error('Heap is empty')
    }

    const min = this.heap[0]
    const end = this.heap.pop()!

    if (this.heap.length > 0) {
      this.heap[0] = end
      this.heapifyDown(0)
    }
    return min
  }

  public insert(item: T) {
    this.heap.push(item)
    this.heapifyUp(this.heap.length - 1)
  }

  public peek() {
    if (this.heap.length === 0) {
      throw new Error('Heap is empty')
    }
    return this.heap[0]
  }

  public size() {
    return this.heap.length
  }

  public has(predicate: (item: T) => boolean) {
    return this.heap.some(predicate)
  }
}

export default MinHeap
