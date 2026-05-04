
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001";

export async function saveContent(text: string) {
  const response = await fetch(`${baseURL}/api/save-content?text=${encodeURIComponent(text)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to save content");
  }

  const data = await response.json();
  return data;
}

export async function searchContent(query: string) {
  const response = await fetch(`${baseURL}/api/search-content?query=${encodeURIComponent(query)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search content");
  }

  const data = await response.json();
  return data.content;
}

export async function rewriteContent(text: string) {
  const response = await fetch(`${baseURL}/api/rewrite-content?text=${encodeURIComponent(text)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to rewrite content");
  }

  const data = await response.json();
  return data.content;
}