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
    </Stack>
  );
}
