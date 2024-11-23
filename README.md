Personal project I work on when I find spare time. 

## Getting Started

After cloning the repository, run the following commands to run the Ollama docker container:

  1. docker-compose pull
  2. docker-compose build
  3. docker-compose up -d

Pull the gemma:2b model
  4. docker exec -it ollama ollama pull gemma:2b
     
Check container is running
  5. docker ps

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

