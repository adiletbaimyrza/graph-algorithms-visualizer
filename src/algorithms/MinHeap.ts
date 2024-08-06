class MinHeap {
  private heap: number[]

  constructor() {
    this.heap = []
  }

  private parent(idx: number) {
    return Math.floor((idx - 1) / 2)
  }

  private leftChild(idx: number) {
    return 2 * idx + 1
  }

  private rightChild(idx: number) {
    return 2 * idx + 2
  }

  private heapifyUp(idx: number) {
    const parent = this.parent(idx)

    if (idx > 0 && this.heap[idx] < this.heap[parent]) {
      const temp = this.heap[idx]
      this.heap[idx] = this.heap[parent]
      this.heap[parent] = temp
      this.heapifyUp(parent)
    }
  }

  private heapifyDown(idx: number) {
    const left = this.leftChild(idx)
    const right = this.rightChild(idx)
    let smallest = idx

    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left
    }

    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right
    }

    if (smallest !== idx) {
      const temp = this.heap[idx]
      this.heap[idx] = this.heap[smallest]
      this.heap[smallest] = temp

      this.heapifyDown(smallest)
    }
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

  public insert(val: number) {
    this.heap.push(val)
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
}

export default MinHeap
