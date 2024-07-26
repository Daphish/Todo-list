import {AppRouterCacheProvider, AppRouterCacheProviderProps} from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Metadata } from "next";
import theme from "../styles/theme";
import { CssBaseline } from "@mui/material";
import StoreProvider from "../components/StoreProvider";

export const metadata : Metadata = {
  title: '',
}

export default function RootLayout(props: AppRouterCacheProviderProps) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <StoreProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>    
  );
}