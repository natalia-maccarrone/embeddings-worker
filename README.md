# Embeddings Worker

A Cloudflare Worker that provides text embeddings using Hugging Face's inference API. This service accepts text inputs and returns vector embeddings using the `sentence-transformers/all-MiniLM-L6-v2` model.

## API Usage

### Endpoint

```
POST /
```

### Request Format

Send a POST request with a JSON array of strings:

```json
["This is the first text to embed", "This is the second text to embed"]
```

### Response Format

Returns a JSON response with the embeddings:

```json
[
  [0.1, 0.2, 0.3, ...],
  [0.4, 0.5, 0.6, ...]
]
```

### Example Usage

```javascript
const response = await fetch('https://your-worker-url.com', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(['Hello, world!', 'How are you today?']),
});

const embeddings = await response.json();
console.log(embeddings);
```

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account
- Hugging Face account and API token

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd embeddings-worker
```

2. Install dependencies:

```bash
npm install
```

3. Set up your Hugging Face token:

```bash
wrangler secret put HF_TOKEN
```

When prompted, enter your Hugging Face API token.

## Development

### Local Development

Start the development server:

```bash
npm run dev
```

This will start the worker locally using Wrangler's development server.

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## Environment Variables

The following environment variables are required:

- `HF_TOKEN`: Your Hugging Face API token with access to the inference API

## Model Information

This worker uses the `sentence-transformers/all-MiniLM-L6-v2` model:

- **Model**: A sentence transformer model optimized for semantic similarity
- **Dimensions**: 384-dimensional embeddings
- **Use Cases**: Semantic search, clustering, classification, and similarity tasks
