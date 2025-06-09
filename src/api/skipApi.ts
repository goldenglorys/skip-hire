import type { Skip } from "../types/skip";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://app.wewantwaste.co.uk/api'

export const fetchSkips = async (
  postcode: string = "NR32",
  area: string = "Lowestoft"
): Promise<Skip[]> => {
  const response = await fetch(
    `${API_BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch skips: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No skip options available for this location");
  }

  return data;
};
