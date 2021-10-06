import { AxiosInstance } from "axios";

export default function (axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(async (res) => {
    if (res.status === 202) {
      console.log("HTTP 202 received, polling operation...");
      console.log("Operation running at " + res.headers.location);
      let pollingResponse = await axiosInstance.get(
        `/api${res.headers.location}`
      );
      console.log(pollingResponse.data);
      while (
        pollingResponse.data.status !== "Succeeded" &&
        pollingResponse.data.status !== "Failed"
      ) {
        pollingResponse = await axiosInstance.get(
          `/api${res.headers.location}`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Operation status is " + pollingResponse.data.status);
      }
      if (
        pollingResponse !== undefined &&
        pollingResponse.data.status === "Failed"
      ) {
        // Treat failures as exceptions, so they can be handled as such
        throw "Operation failed!";
      } else {
        console.log("Operation succeeded!");
        if (pollingResponse.data.type === "crawl") {
          console.log("Retrieving resource at " + res.headers.location);
          return await axiosInstance.get(`/api${res.headers.location}`);
        } else if (pollingResponse.data.type === "batch") {
          console.log(
            "Retrieving resource at " + pollingResponse.headers.location
          );
          return await axiosInstance.get(
            `/api${pollingResponse.headers.location}`
          );
        }
      }
    }
    return res;
  });
}
