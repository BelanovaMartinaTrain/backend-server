import env from "./validateEnv";

export default async function fetchFromPublicAPI(apiUrl: string, apiKey: string) {
    try {
        const headers =
            apiKey !== ""
                ? {
                      headers: {
                          "User-agent": env.USER_AGENT,
                          Authorization: apiKey,
                      },
                  }
                : {
                      headers: {
                          "User-agent": env.USER_AGENT,
                      },
                  };

        const response = await fetch(apiUrl, headers as unknown as RequestInit);

        if (!response.ok) {
            throw new Error("Couldn't fetch data");
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}
