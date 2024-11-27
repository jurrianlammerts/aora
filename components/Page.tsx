import { SafeAreaView } from "react-native-safe-area-context";

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <SafeAreaView
      className="bg-primary flex flex-1"
      edges={["right", "left", "top"]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Page;
