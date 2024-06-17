import { Animal } from "@/types/animal/animal";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function getAnimals(): Promise<Animal[]> {
  try {
    const response = await fetch("http://localhost:3001/animals");
    if (!response.ok) {
      throw new Error("Erro ao buscar");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os dados dos animais:", error);
    throw error;
  }
}

export async function createAnimals(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, species } = req.body as Animal;
    const available = req.body.available || true;
    if (!species || !name) {
      return res.status(400).json({ message: "Existem campos faltando" });
    }
    const Response = await fetch("http://localhost:3001/animals", {
      method: "POST",
      body: JSON.stringify({ name, available, species }),
    });
    if (!Response.ok) {
      throw new Error("Erro ao criar");
    }
    const data = await Response.json();
    return res.status(201).json({ data });
  } catch (error) {
    console.error("Erro ao criar animal:", error);
    return res.status(500).json({ message: "Erro ao criar o animal" });
  }
}
