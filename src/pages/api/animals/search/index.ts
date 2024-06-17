import { Animal } from "@/types/animal/animal";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Animal[] | { error: string }>
): Promise<void> {
  let { name, species } = req.query;

  name = typeof name === "string" && name !== "" ? name : undefined;
  species = typeof species === "string" && species !== "" ? species : undefined;

  try {
    let query = "";
    if (name !== undefined) {
      query += `name=${encodeURIComponent(name)}&`;
    }
    if (species !== undefined) {
      query += `species=${encodeURIComponent(species)}&`;
    }

    query = query.replace(/&$/, "");

    const apiUrl = `http://localhost:3001/animals/search${
      query ? `?${query}` : ""
    }`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Erro ao buscar animais");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar animais:", error);
    res.status(500).json({ error: "Erro ao buscar animais" });
  }
}
