import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth-context";
import { DataStoreProvider } from "@/lib/data-store";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Empresas from "./pages/Empresas";
import EmpresaPerfil from "./pages/EmpresaPerfil";
import Classificados from "./pages/Classificados";
import Planos from "./pages/Planos";
import Sobre from "./pages/Sobre";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardEmpresa from "./pages/dashboard/DashboardEmpresa";
import DashboardEstatisticas from "./pages/dashboard/DashboardEstatisticas";
import DashboardClassificados from "./pages/dashboard/DashboardClassificados";
import DashboardMensagens from "./pages/dashboard/DashboardMensagens";
import DashboardLandingPage from "./pages/dashboard/DashboardLandingPage";
import DashboardPlano from "./pages/dashboard/DashboardPlano";
import DashboardConfiguracoes from "./pages/dashboard/DashboardConfiguracoes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmpresas from "./pages/admin/AdminEmpresas";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminPlanos from "./pages/admin/AdminPlanos";
import AdminFinanceiro from "./pages/admin/AdminFinanceiro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/empresas" element={<Empresas />} />
              <Route path="/empresa/:slug" element={<EmpresaPerfil />} />
              <Route path="/classificados" element={<Classificados />} />
              <Route path="/planos" element={<Planos />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />

              {/* Dashboard (protected) */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
              <Route path="/dashboard/empresa" element={<ProtectedRoute><DashboardEmpresa /></ProtectedRoute>} />
              <Route path="/dashboard/estatisticas" element={<ProtectedRoute><DashboardEstatisticas /></ProtectedRoute>} />
              <Route path="/dashboard/classificados" element={<ProtectedRoute><DashboardClassificados /></ProtectedRoute>} />
              <Route path="/dashboard/mensagens" element={<ProtectedRoute><DashboardMensagens /></ProtectedRoute>} />
              <Route path="/dashboard/landing-page" element={<ProtectedRoute><DashboardLandingPage /></ProtectedRoute>} />
              <Route path="/dashboard/plano" element={<ProtectedRoute><DashboardPlano /></ProtectedRoute>} />
              <Route path="/dashboard/configuracoes" element={<ProtectedRoute><DashboardConfiguracoes /></ProtectedRoute>} />

              {/* Admin (protected, admin only) */}
              <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/empresas" element={<ProtectedRoute adminOnly><AdminEmpresas /></ProtectedRoute>} />
              <Route path="/admin/usuarios" element={<ProtectedRoute adminOnly><AdminUsuarios /></ProtectedRoute>} />
              <Route path="/admin/planos" element={<ProtectedRoute adminOnly><AdminPlanos /></ProtectedRoute>} />
              <Route path="/admin/financeiro" element={<ProtectedRoute adminOnly><AdminFinanceiro /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
