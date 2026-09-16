// const API_BASE_URL = "http://127.0.0.1:5000";

// export async function checkBackendHealth() {
//   const response = await fetch(`${API_BASE_URL}/`);

//   if (!response.ok) {
//     throw new Error("Backend is not responding");
//   }

//   return response.json();
// }

// export async function analyzeTarget(target) {
//   const response = await fetch(`${API_BASE_URL}/api/analyze`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       target: target.trim(),
//     }),
//   });

//   const data = await response.json();

//   if (!response.ok || !data.success) {
//     throw new Error(data.error || "Network analysis failed");
//   }

//   return data;
// }

const API_BASE_URL = "http://127.0.0.1:5000";

export async function checkBackendHealth() {
  const response = await fetch(`${API_BASE_URL}/`);

  if (!response.ok) {
    throw new Error("Backend is not responding");
  }

  return response.json();
}

export async function analyzeTarget(target) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target: target.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Network analysis failed");
  }

  return data;
}

export async function compareTargets(targetA, targetB) {
  const response = await fetch(`${API_BASE_URL}/api/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target_a: targetA.trim(),
      target_b: targetB.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Route comparison failed");
  }

  return data;
}