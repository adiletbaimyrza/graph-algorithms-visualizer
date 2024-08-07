import { TVxId } from '../types'

class MinHeap {
  private heap: Array<[TVxId, TVxId, number]>

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

    if (idx > 0 && this.heap[idx][2] < this.heap[parent][2]) {
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

    if (left < this.heap.length && this.heap[left][2] < this.heap[smallest][2]) {
      smallest = left
    }

    if (right < this.heap.length && this.heap[right][2] < this.heap[smallest][2]) {
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

  public insert(dg: [TVxId, TVxId, number]) {
    this.heap.push(dg)
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

  public has(vertexId2: TVxId) {
    for (const [, v2] of this.heap) {
      if (v2 === vertexId2) {
        return true
      }
    }
    return false
  }
}

export default MinHeap
