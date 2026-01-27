import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { CategoryPage } from "./pages/CategoryPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:id" element={<CategoryPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
