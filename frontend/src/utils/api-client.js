const authURL = process.env.REACT_APP_BASE_URL;

export async function client({ endpoint, data, method }) {
  const config = {
    method: method,
    origin: true,
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
    headers: { "Content-Type": "application/json" },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      if (response.status === 401) {
        return new Promise((resolve, reject) => {
          client("auth/token", { method: "GET" })
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        });
      } else {
        return Promise.reject(data);
      }
    });
}
