import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView
      // @ts-ignore
      className="bg-primary h-full"
      edges={["right", "left", "top"]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Page;
