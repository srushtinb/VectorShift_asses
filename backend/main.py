from collections import deque
from typing import Any, List, Optional

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class PipelineGraph(BaseModel):
    nodes: List[Any]
    edges: List[Any]


def is_directed_acyclic_graph(nodes: List[Any], edges: List[Any]) -> bool:
    all_ids = set()

    for n in nodes:
        if isinstance(n, dict) and 'id' in n and n['id'] is not None:
            all_ids.add(str(n['id']))

    for e in edges:
        if isinstance(e, dict):
            src = e.get('source')
            dst = e.get('target')
            if src is not None and dst is not None:
                all_ids.add(str(src))
                all_ids.add(str(dst))

    adjacency = {node_id: [] for node_id in all_ids}
    indegree = {node_id: 0 for node_id in all_ids}

    for e in edges:
        if not isinstance(e, dict):
            continue
        src = e.get('source')
        dst = e.get('target')
        if src is None or dst is None:
            continue
        src = str(src)
        dst = str(dst)

        if src not in adjacency:
            adjacency[src] = []
            indegree[src] = 0
        if dst not in adjacency:
            adjacency[dst] = []
            indegree[dst] = 0

        adjacency[src].append(dst)
        indegree[dst] += 1

    q = deque([node_id for node_id, deg in indegree.items() if deg == 0])
    visited = 0

    while q:
        node_id = q.popleft()
        visited += 1
        for neighbor in adjacency.get(node_id, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)

    return visited == len(indegree)


@app.post('/pipelines/parse')
def parse_pipeline(graph: PipelineGraph):
    num_nodes = len(graph.nodes)
    num_edges = len(graph.edges)
    is_dag = is_directed_acyclic_graph(graph.nodes, graph.edges)
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag,
    }
