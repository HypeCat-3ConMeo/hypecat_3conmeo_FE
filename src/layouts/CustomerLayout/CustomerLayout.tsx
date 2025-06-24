import CustomerHeader from "./Header/CustomerHeader";
import CustomerSidebar from "./Sidebar/CustomerSidebar";
import { Box } from "@mui/material";

export default function CustomerLayout({ children }: { children?: React.ReactNode }) {
    return (
        <Box display="flex" height="100vh">
            <CustomerSidebar />
            <Box flex={1} display="flex" flexDirection="column">
                <CustomerHeader />
                <Box component="main" p={2} flex={1} overflow="auto">
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
