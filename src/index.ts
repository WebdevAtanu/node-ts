import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(express.json());

// In-memory data store
interface Item {
  id: number;
  name: string;
}

let items: Item[] = [];
let nextId = 1;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from TypeScript backend!");
});

// CREATE
app.post("/items", (req: Request, res: Response) => {
  const { name } = req.body as { name?: string };

  if (!name?.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newItem: Item = { id: nextId++, name: name.trim() };
  items.push(newItem);

  res.status(201).json(newItem);
});

// READ ALL
app.get("/items", (_req: Request, res: Response) => {
  res.json(items);
});

// READ ONE
app.get("/items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// UPDATE
app.put("/items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body as { name?: string };

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (!name?.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  item.name = name.trim();
  res.json(item);
});

// DELETE
app.delete("/items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  const deletedItem = items.splice(index, 1)[0];
  res.json(deletedItem);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
