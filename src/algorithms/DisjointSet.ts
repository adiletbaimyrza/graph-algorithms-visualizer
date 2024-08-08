import { TVxId } from '../types'

class DisjointSet {
  private parent: Map<TVxId, TVxId>
  private rank: Map<TVxId, number>

  constructor(vxs: TVxId[]) {
    this.parent = new Map()
    this.rank = new Map()

    vxs.forEach((vx) => {
      this.parent.set(vx, vx)
      this.rank.set(vx, 0)
    })
  }

  find(vx: TVxId): TVxId {
    if (this.parent.get(vx) !== vx) {
      this.parent.set(vx, this.find(this.parent.get(vx)!))
    }
    return this.parent.get(vx)!
  }

  union(vx1: TVxId, vx2: TVxId): void {
    const root1 = this.find(vx1)
    const root2 = this.find(vx2)

    if (root1 !== root2) {
      const rank1 = this.rank.get(root1)!
      const rank2 = this.rank.get(root2)!

      if (rank1 > rank2) {
        this.parent.set(root2, root1)
      } else if (rank1 < rank2) {
        this.parent.set(root1, root2)
      } else {
        this.parent.set(root2, root1)
        this.rank.set(root1, rank1 + 1)
      }
    }
  }

  isConnected(vx1: TVxId, vx2: TVxId): boolean {
    return this.find(vx1) === this.find(vx2)
  }
}

export default DisjointSet
