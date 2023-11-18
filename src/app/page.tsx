"use client";

import { useState } from "react";
import Image from "next/image";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import styles from "./page.module.css";
import DailyBook from "@/components/DailyBook";

export default function Home() {
  const [page, setPage] = useState(0);

  return (
    <main className={styles.main}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: "100%", height: "100vh" }}
      >
        <div style={{ flex: "1" }}>{page == 0 && <DailyBook />}</div>
        <BottomNavigation
          showLabels
          value={page}
          onChange={(_, newValue) => {
            setPage(newValue);
          }}
        >
          <BottomNavigationAction
            label="Libro diario"
            icon={<LibraryBooksIcon />}
          />
          <BottomNavigationAction
            label="Balance de comprobación"
            icon={<AccountBalanceWalletIcon />}
          />
          <BottomNavigationAction label="Kardex" icon={<CreditCardIcon />} />
        </BottomNavigation>
      </Box>
    </main>
  );
}
