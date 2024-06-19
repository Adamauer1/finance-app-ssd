import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="AddTrans" options={{ headerShown: false }} />
      <Stack.Screen name="Budget" options={{ headerShown: false }} />
      <Stack.Screen name="AddBudget" options={{ headerShown: false }} />
      <Stack.Screen name="Transaction" options={{ headerShown: false }} />
      <Stack.Screen name="ViewTrans" options={{ headerShown: false }} />
      <Stack.Screen name="ViewBudget" options={{ headerShown: false }} />
      <Stack.Screen name="BudgetStatistics" options={{ headerShown: false }} />
      <Stack.Screen
        name="TransactionStatistics"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Stats" options={{ headerShown: false }} />
    </Stack>
  );
}
