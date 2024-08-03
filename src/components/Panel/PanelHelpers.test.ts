import { findSmallestVx } from './PanelHelpers'
import { TPath } from '../../types'
import { test, expect } from 'vitest'

test('findSmallestVx function', () => {
  const vertex1 = { id: 1, x: 0, y: 0 }
  const vertex2 = { id: 2, x: 1, y: 1 }
  const vertex3 = { id: 3, x: 2, y: 2 }

  const edge1 = { id: 1, vertexOne: vertex1, vertexTwo: vertex2 }
  const edge2 = { id: 2, vertexOne: vertex2, vertexTwo: vertex3 }
  const edge3 = { id: 3, vertexOne: vertex3, vertexTwo: vertex1 }

  const path1 = { edge: edge1, vertex: vertex2 }
  const path2 = { edge: edge2, vertex: vertex3 }
  const path3 = { edge: edge3, vertex: vertex1 }

  const adjList = new Map<number, TPath[]>()
  adjList.set(vertex1.id, [path1, path3])
  adjList.set(vertex2.id, [path1, path2])
  adjList.set(vertex3.id, [path2, path3])

  expect(findSmallestVx(adjList)).toEqual(1)
  expect(findSmallestVx(adjList)).not.toEqual(3)
  expect(findSmallestVx(adjList)).not.toEqual(2)
})
