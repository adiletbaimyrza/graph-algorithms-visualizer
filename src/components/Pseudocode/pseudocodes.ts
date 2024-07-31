// prettier-ignore
const pseudocodes = {
  bfs: [
    { indent: 0, content: 'function bfs(start,graph): {' },
    { indent: 20, content: 'const queue = [start]' },
    { indent: 20, content: 'const visited = new Set()' },
    { indent: 20, content: 'while (queue.length) {' },
    { indent: 40, content: 'const vertex = queue.shift();' },
    { indent: 40, content: 'if (!visited.has(vertex)) {' },
    { indent: 60, content: 'visited.add(vertex);' },
    { indent: 60, content: 'for (const neighbor of graph[vertex]) {' },
    { indent: 80, content: 'if (!visited.has(vertex)) {' },
    { indent: 100, content: 'queue.push(neighbor);' },
    { indent: 80, content: '}' },
    { indent: 60, content: '}' },
    { indent: 40, content: '}' },
    { indent: 20, content: '}' },
    { indent: 0, content: '}' },
  ],
  dfs: [
    { indent: 0,content: 'function dfs(graph, start): {' },
    { indent: 20, content: 'const stack = [start];' },
    { indent: 20, content: 'const visited = new Set();' },
    { indent: 20, content: 'while (stack.length) {' },
    { indent: 40, content: 'const vertex = stack.pop();' },
    { indent: 40, content: 'if (!visited.has(vertex)) {' },
    { indent: 60, content: 'visited.add(vertex);' },
    { indent: 60, content: 'for (const neighbor of graph[vertex]) {' },
    { indent: 80, content: 'if (!visited.has(neighbor)) {' },
    { indent: 100, content: 'stack.push(neighbor);' },
    { indent: 80, content: '}' },
    { indent: 60, content: '}' },
    { indent: 40, content: '}' },
    { indent: 20, content: '}' },
    { indent: 0, content: '}' },
  ],
}

export default pseudocodes
