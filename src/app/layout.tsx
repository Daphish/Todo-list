import {AppRouterCacheProvider, AppRouterCacheProviderProps} from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { CssBaseline } from "@mui/material";

export default function RootLayout(props: AppRouterCacheProviderProps) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>    
  );
}