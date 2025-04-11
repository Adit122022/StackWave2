// routes/search.js
const express = require('express');
const { Client }  = require('@elastic/elasticsearch');

const router = express.Router();
const esClient = new Client({ node: 'http://localhost:9200' });

router.get('/', async (req, res) => {
  const { q } = req.query;
  console.log('Search query:', req.query);

  if (!q) return res.json([]);

  try {
    const response = await esClient.search({
      index: 'questions',
      query: {
        multi_match: {
          query: q,
          fields: ['title^2', 'body'],
          fuzziness: 'AUTO',
        },
      },
    });

    const hits = response.hits.hits.map(hit => hit._source);
    res.json(hits);
  } catch (err) {
    console.error('Elasticsearch search error:', err?.meta?.body?.error || err.message || err);
    res.status(500).json({ message: 'Search failed' });
  }
});

module.exports = router;
