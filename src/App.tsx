import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Grid } from "./components/Grid/Grid";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <Grid />
    </QueryClientProvider>
  );
}

export default App;
