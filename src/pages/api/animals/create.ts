import { Animal } from "@/types/animal/animal";

export async function searchAnimals(): Promise<Animal[]> {
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
