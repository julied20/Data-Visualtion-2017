var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    // nodes
    { data: { id: 'a', }, position: { x: 100, y: 200 }},
    { data: { id: 'b', }, position: { x: 150, y: 240 }},
    { data: { id: 'c', }, position: { x: 123, y: 234 }},
    { data: { id: 'd' }, position: { x: 130, y: 200 } },
    // edges
    {
      data: {
        id: 'ab',
        source: 'a',
        target: 'b'
      }
    },
    {
      data: {
        id: 'cd',
        source: 'c',
        target: 'd'
      }
    },
    {
      data: {
        id: 'ac',
        source: 'a',
        target: 'c'
      }
    },
  ],
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'curve-style': 'unbundled-bezier'
      }
    }
  ],
      // A essayer plus tard
      //          'curve-style': 'unbundled-bezier',
      //          'control-point-distance': '20px',
      //          'control-point-weight': '0.7'
      layout: {
        name: 'grid'
      }
    });


cy.nodes().ungrabify()