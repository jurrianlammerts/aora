import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SAFE_TABBAR_HEIGHT = 0;

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <SafeAreaView
      className="bg-primary h-full"
      edges={["right", "left", "top"]}
    >
      {children}
      <View style={{ height: SAFE_TABBAR_HEIGHT }} />
    </SafeAreaView>
  );
};

export default Page;
