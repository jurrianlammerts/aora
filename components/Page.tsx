import { SafeAreaView } from 'react-native-safe-area-context';

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <SafeAreaView className="flex flex-1 bg-primary" edges={['right', 'left', 'top']}>
      {children}
    </SafeAreaView>
  );
};

export default Page;
